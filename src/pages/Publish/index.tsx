import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useStore from "@/store";
import { useRef, useState } from "react";
import { http } from "@/utils";

const { Option } = Select;

const Publish = () => {
  const { channelStore } = useStore();
  const [fileList, setFileList] = useState([]);
  const cacheImgList: any = useRef();
  const onUploadChange = (result: any) => {
    setFileList(result);
    cacheImgList.current = result;
  };
  const [imageCount, setImageCount] = useState(1);
  const radioChange = (e: any) => {
    const rawValue = e.target.value;
    setImageCount(rawValue);
    if (rawValue === 1) {
      const img: any = cacheImgList.current ? cacheImgList.current[0] : [];
      // todo
      setFileList(img);
    } else if (rawValue === 3) {
      setFileList(cacheImgList.current);
    }
  };
  const onFinish = (values) => {
    const { channel_id, content, title, type } = values;
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type: type,
        images: fileList.map((item: any) => item.response.data.url),
      },
    };
    uploadFn(params);
  };
  const uploadFn = async (params) => {
    await http.post("/mp/articles?draft=false", params);
  };
  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>发布文章</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, content: "" }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelStore.channelList.map(
                (channel: { name: string; id: number }) => (
                  <Option value={channel.id} key={channel.id}>
                    {channel.name}
                  </Option>
                )
              )}
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imageCount > 1}
                maxCount={imageCount}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;
