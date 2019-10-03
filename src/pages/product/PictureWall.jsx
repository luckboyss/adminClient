import React, { Component } from 'react';
import { Upload, Icon, Modal } from 'antd';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class PicturesWall extends Component {
  state = {
    previewVisible: false, // 预览大图是否可见
    previewImage: '', // 大图的url或者是base64值
    fileList: [
      { // 文件信息对象 file
        uid: '-1', // 唯一标识
        name: 'image.png', // 文件名
        status: 'done', // 状态: uploading done error remove
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', // 图片的url
      },
    ],
  };

  handleCancel = () => this.setState({ previewVisible: false });

  /*
  进行大图预览的回调函数
  file: 当前选中的图片对应的file
  */
  handlePreview = async file => {
    if (!file.url && !file.preview) { // 如果file没有图片url， 只进行一次base64处理来显示图片
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  /* 
  在file的状态发生改变的监听回调
  file: 当前操作(上传/删除)的file
  */
  handleChange = ({ file, fileList }) => {
    // file与fileList中最后一个file代表同一个图片的不同对象
    if (file.status === 'done') {
      // 将fileList中最后一个file保存到file变量
      file = fileList[fileList.length - 1];
      const { name, url } = file.response.data;
      file.name = name;
      file.url = url;
    }
    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action="/manage/img/upload" // 上传文件的url
          name='image' // 发送到后台文件的参数名
          listType="picture-card" // 显示风格
          fileList={fileList} // 已上传的图片文件对象的数组
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
