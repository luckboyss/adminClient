import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Card,
  Icon,
  List,
} from 'antd';

import LinkButton from '../../components/LinkButton';
import memoryUtils from '../../utils/memoryUtils';

const Item = List.Item;



/* 
商品详情路由组件
*/
export default class ProductDetail extends Component {

  render() {
    const product = memoryUtils.product;
    if (!product || !product._id) {
      return <Redirect to='/product' />
    }

    const title = (
      <span>
        <LinkButton onClick={this.props.history.goBack}>
          <Icon type='arrow-left' />
        </LinkButton>
        <span>商品详情</span>
      </span>
    );
    return (
      <Card title={title} className='detail'>
        <List>
          <Item>
            <span className='detail-left'>商品名称:</span>
            <span>{product.name}</span>
          </Item>
          <Item>
            <span className='detail-left'>商品描述:</span>
            <span>{product.desc}</span>
          </Item>
          <Item>
            <span className='detail-left'>商品价格:</span>
            <span>{product.price}元</span>
          </Item>
          <Item>
            <span className='detail-left'>所属分类:</span>
            <span>抠脚大汉</span>
          </Item>
          <Item>
            <span className='detail-left'>商品图片:</span>
            <span>
              <img className='detail-img' src="http://localhost:5000/upload/image-1570009898209.jpg" alt=""/>
              <img className='detail-img' src="http://localhost:5000/upload/image-1570009898209.jpg" alt=""/>
            </span>
          </Item>
          <Item>
            <span className='detail-left'>商品详情:</span>
            <div dangerouslySetInnerHTML={{__html: product.detail}}></div>
          </Item>
        </List>
      </Card>
    );
  }
}
