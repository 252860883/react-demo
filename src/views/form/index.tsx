import {
    Form,
    Input,
    Select,
    TreeSelect,
    Button,
    Switch,
    Radio,
    Message,
    InputTag,
    Rate,
    Slider,
    Upload,
    DatePicker,
    FormInstance,
    TimePicker,
    Transfer,
} from '@arco-design/web-react';
import { useEffect, useRef } from 'react';
// import { IconCalendar } from '@arco-design/web-react/icon';
// import dayjs from "dayjs";
const { RangePicker } = DatePicker;
// const TreeNode = TreeSelect.Node;

const formItemLayout = {
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 17,
    },
};

const treeData = [
    {
        key: 'node1',
        // icon: <IconCalendar />,
        title: 'Trunk',
        disabled: true,
        children: [
            {
                key: 'node2',
                title: 'Leaf',
            },
        ],
    },
    {
        key: 'node3',
        title: 'Trunk2',
        // icon: <IconCalendar />,
        children: [
            {
                key: 'node4',
                title: 'Leaf',
            },
            {
                key: 'node5',
                title: 'Leaf',
            },
        ],
    },
];

const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];

const dataSource = new Array(8).fill(null).map((_, index) => ({
    key: `${index + 1}`,
    value: `Option ${index + 1}`,
}));

function TransferMore() {
    return (
        <Form.Item label="穿梭框" field="transfer">
            <Transfer
                showSearch
                dataSource={dataSource}
                searchPlaceholder="Please select"
                defaultTargetKeys={['1', '2', '3']}
                defaultSelectedKeys={['4', '6', '7']}
                titleTexts={['To-do list', 'Selected list']}
            />
        </Form.Item>
    );
}

export default function FormCom() {
    const formRef = useRef<FormInstance<any>>(null);

    useEffect(() => {
        formRef.current?.setFieldsValue({ type: 'select' });
        console.log('useEffect', formRef);
    }, []);

    const onValuesChange = (changeValue: any, values: any) => {
        console.log('onValuesChange: ', changeValue, values);
    };

    return (
        <div style={{ width: '500px', margin: '100px auto' }}>
            <Form
                ref={formRef}
                initialValues={{
                    slider: 20,
                    'a.b[0].c': ['b'],
                }}
                labelAlign="left"
                scrollToFirstError
                {...formItemLayout}
                onValuesChange={onValuesChange}
            >
                <Form.Item shouldUpdate>
                    {(value) => {
                        return <pre>{JSON.stringify(value, null, 2)}</pre>;
                    }}
                </Form.Item>
                <Form.Item
                    label="测试1"
                    field="value"
                    tooltip={<div>Username is required </div>}
                    rules={[{ required: true }]}
                >
                    <Input></Input>
                </Form.Item>
                <Form.Item label="测试233" field="tag">
                    <InputTag allowClear placeholder="Input and press Enter"></InputTag>
                </Form.Item>
                <Form.Item label="展示什么组件" field="type">
                    <Radio.Group defaultValue="select">
                        <Radio value="rate">rate</Radio>
                        <Radio value="select">select</Radio>
                        <Radio value="slider">slider</Radio>
                    </Radio.Group>
                </Form.Item>

                {/* 表单联动控制 */}
                <Form.Item shouldUpdate noStyle>
                    {(formValue) => {
                        return formValue.type === 'rate' ? (
                            <Form.Item label="rate">
                                <Rate allowHalf></Rate>
                            </Form.Item>
                        ) : formValue.type === 'slider' ? (
                            <Form.Item label="slider">
                                <Slider></Slider>
                            </Form.Item>
                        ) : (
                            <Form.Item label="select">
                                <Select
                                    placeholder="Please select"
                                    style={{ width: 154 }}
                                    onChange={(value) =>
                                        Message.info({
                                            content: `You select ${value}.`,
                                            showIcon: true,
                                        })
                                    }
                                >
                                    {options.map((option, index) => (
                                        <Select.Option key={option} disabled={index === 3} value={option}>
                                            {option}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        );
                    }}
                </Form.Item>
                <Form.Item label="switch" field="switch">
                    <Switch></Switch>
                </Form.Item>
                <Form.Item label="时间选择器" field="timePicker">
                    <TimePicker></TimePicker>
                </Form.Item>
                <Form.Item label="一陀时间选择器" field="timePicker2">
                    {/* <DatePicker showTime defaultValue="2019-06-03 08:00:00" />
          <YearPicker defaultValue="2019" />
          <MonthPicker defaultValue="2019-06" />
          <WeekPicker defaultValue={dayjs("2019-08-02")} /> */}
                    <RangePicker
                        showTime
                        defaultValue={['2019-08-08 00:00:00', '2019-08-18 09:09:06']}
                        style={{ width: 360 }}
                    />
                </Form.Item>

                <TransferMore></TransferMore>

                <Form.Item label="级连框">
                    <TreeSelect treeData={treeData} placeholder="请选择..." style={{ width: 300 }} />
                </Form.Item>

                <Form.Item label="上传" field="upload">
                    <Upload
                        multiple
                        imagePreview
                        defaultFileList={[
                            {
                                uid: '-2',
                                name: '20200717-103937.png',
                                url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp',
                            },
                            {
                                uid: '-1',
                                name: 'hahhahahahaha.png',
                                url: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/e278888093bef8910e829486fb45dd69.png~tplv-uwbnlip3yd-webp.webp',
                            },
                        ]}
                        action="/"
                        listType="picture-card"
                        onPreview={(file) => {
                            Message.info('click preview icon');
                        }}
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        onClick={async () => {
                            if (formRef.current) {
                                try {
                                    await formRef.current.validate();
                                    Message.info('校验通过，提交成功！');
                                } catch (_) {
                                    console.log(formRef.current.getFieldsError());
                                    console.log(formRef);

                                    Message.error('校验失败，请检查字段！');
                                }
                            }
                        }}
                        type="primary"
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
