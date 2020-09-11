import React, { Component } from 'react'

//引入antd的Card、Button组件
import { Card, Button, Table, } from 'antd'
// 引入antd的图标
import { PlusCircleOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
//引入reqNo1SubjectPagination 发送请求
import { reqNo1SubjectPagination } from '@/api/edu/subject';
//引入index.less样式文件==引入样式放最后
import './index.less'
export default class Subject extends Component {
    //状态state驱动着页面的显示
    state = {
        //用对象来存储no1SubjectInfo属性，
        //目的：减少state身上的属性数量，观察no1SubjectInfo属性值更清晰
        no1SubjectInfo: {
            //存储一级分类数据
            items: [],//当前页的一级分类数据
            total: 0,//数据总数
        },
        pageSize:5,//页大小（每页几条信息）pageSize太多了，统一管理一下
    }

    //得到一级分类分页信息
    //根据页码和页的大小去请求对应的数据
    getNo1SubjectPagination = async(page,pageSize=this.state.pageSize) => {
          // const result = await reqNo1SubjectPagination(1,5)
        // console.log(result) //这里的result是一个total对象
        // const {items,total} = result//这里面的items是本页所需要的数据
        const { items, total } = await reqNo1SubjectPagination(page,pageSize)
        //将state中no1SubjectInfo
        this.setState({ no1SubjectInfo: {items,total} })
    }

    componentDidMount(){
        //初始化第一页数据
        this.getNo1SubjectPagination(1)//这里的getNo1SubjectPagination有两个参数（page,pageSize）
        //由于pageSize默认值为5，所以此处只传递一个page，若要传递新的pageSize值，就会覆盖原默认值
    }
   
    render() {
        //从状态中获取所有的一级分类数据
        const {no1SubjectInfo:{total,items},pageSize} = this.state
        //类里面不能随便写 ，render是函数，内部可以写函数体
        //dataSource是表格的数据源，后期一定是由服务器返回的
        //columns是表格的列配置（重要） 用来显示表格
        const columns = [
            {
                title: '分类名',//列名
                // dataIndex: 'name',//数据索引项 数据所展示的项
                key: '0',//每列的唯一标识
                width: '80%',
                //1_render和dataIndex同时存在时,以render为主
                render: items => (items.title)
                //2_dataIndex存在时,控制着render接收到的参数
                //3_当dataIndex不存在时 render接收到的参数,传递的时当前数据项的所有的内容
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: '1',
                align: 'center',
                //render 是Table中 columns 的 API 做高级渲染的  可以处理每一列中重复的部分 直接和每一列进行对话
                render: () => {
                    return (
                        <>
                            <Button className="left_btn" type="primary" icon={<FormOutlined />}></Button>
                            <Button type="danger" icon={<DeleteOutlined />}></Button>
                        </>
                    )
                }
            },


        ];

        return (
            <Card title={<Button type="primary" icon={<PlusCircleOutlined />}>新增分类</Button>}>
                新增分类
                <Table 
                dataSource={items} 
                columns={columns} 
                rowKey="_id" 
                pagination={{ 
                    pageSize:pageSize,
                    total:total,
                    onChange:(page) => {this.getNo1SubjectPagination(page)},
                    }} 
                />
            </Card>
        )
    }
}
