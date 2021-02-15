import  React from "react";
import { Table, Tag, Space } from 'antd';


 
export const KalamAndKayadTable = (props) =>{

  const columns = [
    {
      title: 'कायदा',
      dataIndex: 'rules',
      key: 'rules',
    },
    {
      title: 'कलम',
      dataIndex: 'kalam',
      key: 'kalam',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  
    return (
        <Table columns={columns} dataSource={props.data} /> 
    )
}


