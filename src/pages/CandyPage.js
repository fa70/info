import React, { Component } from 'react';
import { Table } from 'antd';

import axios from 'axios';
import moment from 'moment';

const typeToText = (type) => {
  let text = '';
  switch(type){
    case 1:
      text = '空投';
      break;
    case 2:
      text = '交易所活动';
      break;  
    case 3:
      text = '平台注册';
      break;
    case 4:
      text = 'APP挖矿';
      break;
    case 5:
      text = '其他';
      break;      
    default:
      break;  
  }
  return text;
};

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id' },
  { title: '类型', dataIndex: 'type', key: 'type', render: text => typeToText(text)},
  { title: '标题', dataIndex: 'title', key: 'titile', render: (text, record) => <a href={record.link} target='_blank' rel="noopener noreferrer">{text}</a>},
  { title: '详情', dataIndex: 'info', key: 'info', width: 800 },
  { title: '开始时间', dataIndex: 'start_time', key: 'start_time', render: text => moment(text*1000).format('YYYY-MM-DD HH:mm:ss')},
  { title: '结束时间', dataIndex: 'end_time', key: 'end_time', render: text => moment(text*1000).format('YYYY-MM-DD HH:mm:ss')},
];

class CandyPage extends Component {

  state = {data : []}

  componentDidMount(){
    axios.post('http://127.0.0.1:8888/v1/chain/get_table_rows',
    {  
      code: 'coincoininfo',
      scope: 'coincoininfo',
      table: 'candytable',   
      json: true,
    }).then(res => {
      let datas = [...res.data.rows];
      datas.forEach(item => {
        item.key = item.id;
      });
      this.setState({data: datas});
    }).catch(err => {
      console.log(err);
    });
  }

  render(){
    return <Table columns={columns} dataSource={this.state.data} />
  }
}

export default CandyPage;