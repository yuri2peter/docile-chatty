## CreativeChatGLM API 文档

### 服务状态检查

#### 路由

GET /

#### 参数

无

#### 响应

```json
{ "message": "started", "success": true }
```

### 流式对话

#### 路由

POST /stream

#### 参数

```json
{
  "query": "你喜欢做什么？",
  "answer_prefix": "我平时",
  "max_length": 256,
  "top_p": 0.7,
  "temperature": 1.0,
  "history": [["你是谁", "我是一只猫娘"]]
}
```

#### 响应

```json
{ "message": "started", "success": true }
```

### 打断生成

#### 路由

POST /interrupt

#### 参数

无

#### 响应

```json
{ "message": "OK" }
```
