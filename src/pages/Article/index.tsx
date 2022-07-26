import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  DatePicker,
  Select,
  Table,
  Tag,
  Space,
} from "antd";
import "moment/locale/zh-cn";
import locale from "antd/es/date-picker/locale/zh_CN";
import "./index.scss";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import img404 from "@/assets/error.png";
import { useState } from "react";
import { useEffect } from "react";
import { http } from "@/utils";
import useStore from "@/store";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Article = () => {
  // 频道列表管理
  const { channelStore } = useStore();
  const onFinish = (value: {
    channel_id: number;
    date: Array<any>;
    status: number;
  }) => {
    const { channel_id, date, status } = value;
    // 数据处理
    const _params: any = {};
    if (status !== -1) {
      _params.status = status;
    }
    if (channel_id) {
      _params.channel_id = channel_id;
    }
    if (date) {
      _params.begin_pubdate = date[0].format("YY-MM-DD");
      _params.end_pubdate = date[1].format("YY-MM-DD");
    }
    setParams({
      ...params,
      ..._params,
    });
  };

  // 文章列表管理 统一管理数据 将来修改给setList传对象
  const [articleData, setArticleData] = useState({
    list: [], // 文章列表
    count: 0, // 文章数量
  });
  // 文章参数管理
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
  });

  // 异步请求函数需要依赖一些数据变化而重新执行，写入useEffect函数内部
  useEffect(() => {
    const loadList = async () => {
      const res = await http.get("/mp/articles", { params });
      const { results, total_count } = res.data;
      setArticleData({ list: results, count: total_count });
    };
    loadList();
  }, [params]);

  const deleteArticle = async (data: { id: number }) => {
    await http.delete(`/mp/articles/${data.id}`);
    setParams({
      ...params,
      page: 1,
    });
  };
  const navigate = useNavigate();

  const goPublish = async (data: { id: number }) => {
    navigate(`/publish?id=${data.id}`);
  };
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return <img src={cover || img404} width={80} height={60} alt="" />;
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (data) => <Tag color="green">审核通过</Tag>,
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => goPublish(data)}
            />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => deleteArticle(data)}
            />
          </Space>
        );
      },
    },
  ];

  const pageChange = (page: any) => {
    setParams({ ...params, page });
  };
  return (
    <div>
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: null }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>审核通过</Radio>
              <Radio value={3}>审核失败</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 120 }}>
              {channelStore.channelList.map((channel: any) => (
                <Option key={channel.id} value={channel.id}>
                  {channel.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 80 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${articleData.count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={articleData.list}
          pagination={{
            position: ["bottomCenter"],
            current: params.page,
            pageSize: params.perPage,
            onChange: pageChange,
          }}
        />
      </Card>
    </div>
  );
};

export default Article;
