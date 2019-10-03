import React, { Component } from 'react';
import {
  Card,
  Select,
  Input,
  Button,
  Icon,
  Table,
  message,
} from "antd";
import throttle from 'lodash.throttle';

import { reqProductList, reqSearchProductList, reqUpdateStatus } from '../../api';
import LinkButton from '../../components/LinkButton';
import { PAGE_SIZE } from '../../utils/constants';
import memoryUtils from '../../utils/memoryUtils';

const { Option } = Select;

/* 商品管理的首页组件 */
export default class ProductHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      productList: [], // 商品列表
      tatal: 0, // 商品总数量
      searchType: 'productName', // 默认按商品名称搜索
      searchName: '', // 搜索关键字
    };
    this.initColumns();
  }


  initColumns = () => {
    this.columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
      },
      {
        title: '价格',
        dataIndex: 'price',
        render: (price) => '￥' + price,
      },
      {
        title: '状态',
        width: 100,
        // dataIndex: 'status',
        render: ({ _id, status }) => {
          let btnText = '上架';
          let text = '已下架';
          if (status === 2) {
            btnText = '下架';
            text = '在售';
          }
          return (
            <span>
              <Button
                type='primary'
                onClick={() => { this.updateStatus(_id, status) }}
              >{btnText}</Button><br />
              <span style={{
                textAlign: 'center',
                width: '64px',
                display: 'inline-block'
              }}>{text}</span>
            </span>
          );
        }
      },
      {
        title: '操作',
        render: (product) => (
          <span>
            <LinkButton onClick={() => {
              // 在内存中保存product
              memoryUtils.product = product;
              this.props.history.push('./product/detail');
            }}>
              详情
            </LinkButton>
            <LinkButton onClick={() => {
              // 在内存中保存product
              memoryUtils.product = product;
              this.props.history.push('./product/addupdate');
            }}>
              修改
            </LinkButton>
          </span>
        )
      }
    ];
  }

  /* 
  异步获取指定页码商品(可能带搜索)分页列表
  */

  getProductList = async (pageNum) => {
    // 保存当前页码
    this.pageNum = pageNum;
    let result;
    const { searchType, searchName } = this.state;
    if (!this.isSearch) {
      // 发送请求获取商品数据
      result = await reqProductList(pageNum, PAGE_SIZE);
    } else {
      // 发送请求获取 *搜索* 商品数据
      result = await reqSearchProductList({ pageNum, pageSize: PAGE_SIZE, searchName, searchType });
    }
    if (result.status === 0) {
      const { total, list } = result.data;
      this.setState({
        productList: list,
        total,
      });
    }
  }

  updateStatus = throttle(async (productId, status) => { // 函数节流
    status = status === 1 ? 2 : 1;
    const result = await reqUpdateStatus(productId, status);
    if (result.status === 0) {
      message.success('更新商品状态成功!')
      // 获取当前页显示
      this.getProductList(this.pageNum);
    }
  }, 2000);

  handleInputChange = (e) => {
    // 修改搜索标记
    if (this.isSearch) this.isSearch = false;
    let searchName = e.target.value;
    this.setState({
      searchName
    });
  }

  handleSelectChange = (value) => {
    this.setState({
      searchType: value,
    });
  }

  componentDidMount() {
    this.getProductList(1);
  }

  render() {
    const { loading, productList, total, searchType, searchName } = this.state;
    const title = (
      <span>
        <Select
          value={searchType}
          style={{ width: 200 }}
          onChange={this.handleSelectChange}
        >
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input
          style={{ width: 200, margin: '0 10px' }}
          placeholder='关键字'
          value={searchName}
          onChange={this.handleInputChange}
        />
        <Button
          type='primary'
          onClick={() => {
            this.isSearch = true; // 保存搜索的标记
            this.getProductList(1);
          }}
        >搜索</Button>
      </span>
    );

    const extra = (
      <Button type='primary' onClick={() => {
        /* 注意 */
        memoryUtils.product = {};
        this.props.history.push('/product/addupdate');
      }}>
        <Icon type='plus' />
        添加商品
      </Button>
    );
    return (
      <Card
        title={title}
        extra={extra}
      >
        <Table
          bordered
          loading={loading}
          rowKey='_id'
          columns={this.columns}
          dataSource={productList}
          pagination={{
            total,
            defaultPageSize: PAGE_SIZE,
            showQuickJumper: true,
            onChange: this.getProductList,
            current: this.pageNum
          }}
        />
      </Card>
    )
  }
}
