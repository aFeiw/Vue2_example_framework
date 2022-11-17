

# 1. 社区健康管理系统 API 接口文档

## 1.1. API  接口说明

- 接口基准地址：`http://127.0.0.1:5020/api`
- 服务端已开启 CORS 跨域支持
- 认证统一使用 Token 认证
- 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
- 使用 HTTP Status 标识状态
- 数据返回格式统一使用 JSON(支持接收x-www-form-urlencoded)

## 1.2. 登录

### 1.2.1. 登录验证接口

- 请求路径：/user/login
- 请求方法：post
- 请求参数

| 参数名   | 类型   | 参数说明 | 备注     |
| -------- | ------ | -------- | -------- |
| username | string | 用户名   | 不能为空 |
| password | string | 密码     | 不能为空 |

- 请求成功实例

  ```
  {
      "username":"扁鹊传人",
      "password":"admin000" 
  }
  ```

  

- 响应参数

| 参数名 | 类型   | 参数说明 | 备注                        |
| ------ | ------ | -------- | --------------------------- |
| role   | number | 角色信息 | 0,普通用户,1医生/社区管理员 |
| token  | string | 令牌     | 基于 jwt 的令牌             |

- 响应数据

  

```json
{
    "status": 200,
    "msg": "登录成功",
    "roles": 1,
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwidXNlcm5hbWUiOiLmiYHpuYrkvKDkuroiLCJwYXNzd29yZCI6IiIsInJvbGVzIjoxLCJpYXQiOjE2NDIwNzEyMjUsImV4cCI6MTY0MjE1NzYyNX0.BDRJLWPzDe_rgWMNiaiKnoDPDEnEIpyd6_qFIAeD1Jw"
}
```

## 1.3. 注册

### 1.3.1. 注册验证接口列表

- 请求路径：user/register
- 请求方法：post
- 请求参数

| 参数名   | 类型   | 参数说明 | 备注     |
| -------- | ------ | -------- | -------- |
| username | string | 用户名   | 不能为空 |
| password | string | 密码     | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注   |
| ------ | -------- | ------ |
| status | 200:成功 | 状态码 |

- 响应数据

```json
{
    "status": 200,
    "msg": "注册成功"
}
```

## 1.4. 待诊用户管理

### 1.3.1. 待诊用户查询列表

- 请求路径：/sick/getinfo
- 请求方法：get
- 请求参数

| 参数名   | 类型   | 参数说明     | 备注               |
| -------- | ------ | ------------ | ------------------ |
| pagenum  | number | 当前页码     | 不能为空           |
| pagesize | number | 每页显示条数 | 不能为空           |
| name     | string | 待诊用户姓名 | 可以为空           |
| status   | string | 待诊用户状态 | 0,1:已/未 可以为空 |

- 响应参数

  | 参数名         | 类型   | 参数说明     |
  | -------------- | ------ | ------------ |
  | name           | string | 患者姓名     |
  | sex            | number | 患者性别     |
  | id_card        | number | 身份证号     |
  | phone          | number | 手机号       |
  | adress         | string | 地址         |
  | email          | string | 邮箱         |
  | medical_cards  | string | 医保情况     |
  | anamnesis      | string | 既往病史     |
  | Family_genetic | string | 家族遗传史   |
  | drug_allergy   | string | 药品禁忌     |
  | describe       | string | 个人症状描述 |
  | family_need    | number | 家庭医生0，1 |
  | status         | number | 就诊状态     |
  | record         | string | 就诊记录     |
  | result         | string | 就诊结果     |
  | id      | number | 医师id       |

- 响应数据

```json
{
    "status": 200,
    "msg": "查询成功",
    "data": [
        {
            "id": 1,
            "name": "迪迦",
            "sex": 0,
            "id_card": "62202199856321456",
            "phone": "13652324456",
            "adress": "121212121",
            "anamnesis": "1212121212",
            "family_genetic": "1",
            "describe": "1",
            "drug_allergy": "1",
            "family_need": 1,
            "status": 0,
            "id": 1,
            "is_delete": 0
        }
    ],
    "total": 1
}
```

### 1.3.2. 根据id查询用户信息

- 请求路径：/sick/info/:id
- 请求方法：get
- 请求参数

| 参数名 | 类型   | 参数说明 | 备注     |
| ------ | ------ | -------- | -------- |
| id     | number | 用户id   | 不能为空 |

- 响应参数

  | 参数名              | 类型   | 参数说明     |
  | ------------------- | ------ | ------------ |
  | name                | string | 患者姓名     |
  | sex                 | number | 患者性别     |
  | id_card             | number | 身份证号     |
  | phone          | number | 手机号       |
  | adress         | string | 地址         |
  | email          | string | 邮箱         |
  | medical_cards  | string | 医保情况     |
  | anamnesis      | string | 既往病史     |
  | Family_genetic | string | 家族遗传史   |
  | drug_allergy   | string | 药品禁忌     |
  | describe       | string | 个人症状描述 |
  | family_need    | number | 家庭医生0，1 |
  | status         | number | 就诊状态     |
  | record         | string | 就诊记录     |
  | result         | string | 就诊结果     |
  | id           | number | 医师id       |

- 响应数据

```json
{
    "status": 200,
    "msg": "获取用户信息成功",
    "data": {
        "id": 2,
        "name": "娄永成",
        "sex": 0,
        "id_card": "1",
        "phone": "1",
        "adress": "1",
        "anamnesis": null,
        "family_genetic": "1",
        "describe": "1",
        "drug_allergy": "1",
        "family_need": 1,
        "status": 0,
        "id": 1,
        "is_delete": 0
    }
}
```

### 1.3.4. 添加就诊用户信息

- 请求路径：/sick/insertinfo
- 请求方法：post
- 请求参数

| 参数名              | 类型   | 参数说明     | 备注             |
| ------------------- | ------ | ------------ | ---------------- |
| id                  | number | 当前用户id   | 不能为空         |
| name           | string | 患者姓名     | 不能为空         |
| sex            | number | 患者性别     | 不能为空         |
| id_card        | number | 身份证号     | 不能为空         |
| phone          | number | 手机号       | 不能为空         |
| adress         | string | 地址         | 不能为空         |
| email          | string | 邮箱         | 可以为空         |
| medical_cards  | string | 医保情况     | 可以为空         |
| anamnesis      | string | 既往病史     | 可以为空         |
| Family_genetic | string | 家族遗传史   | 可以为空         |
| drug_allergy   | string | 药品禁忌     | 不能为空         |
| describe       | string | 个人症状描述 | 不能为空         |
| family_need    | number | 家庭医生0，1 | 不能为空(1.需要) |
| status         | number | 就诊状态     | 不能为空         |
| record         | string | 就诊记录     | 可以为空         |
| result         | string | 就诊结果     | 可以为空         |
| id           | number | 医师id       | 可以为空         |

- 响应参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| status | 200      | 自增成功 |

- 响应数据

```json
{
    "status": 200,
    "msg": "修改用户信息成功"
}
```

 

### 1.3.5. 修改就诊用户信息

- 请求路径：sick/updateinfo

- 请求方法：post

- 请求参数

  | 参数名              | 类型   | 参数说明     | 备注     |
  | ------------------- | ------ | ------------ | -------- |
  | name           | string | 患者姓名     | 不能为空 |
  | sex            | number | 患者性别     | 不能为空 |
  | id_card        | number | 身份证号     | 不能为空 |
  | phone          | number | 手机号       | 不能为空 |
  | adress         | string | 地址         | 不能为空 |
  | email          | string | 邮箱         | 可以为空 |
  | medical_cards  | string | 医保情况     | 可以为空 |
  | anamnesis      | string | 既往病史     | 可以为空 |
  | Family_genetic | string | 家族遗传史   | 可以为空 |
  | drug_allergy   | string | 药品禁忌     | 不能为空 |
  | describe       | string | 个人症状描述 | 不能为空 |
  | family_need    | number | 家庭医生0，1 | 不能为空 |
  | status         | number | 就诊状态     | 不能为空 |
  | record         | string | 就诊记录     | 可以为空 |
  | result         | string | 就诊结果     | 可以为空 |
  | id           | number | 医师id       | 可以为空 |

- 响应参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| status | 200      | 自增成功 |

- 响应数据

```json
{
    "status": 200,
    "msg": "新增待诊用户信息成功"
}
```



### 1.3.6. 根据id删除就诊用户

- 请求路径：sick/deleteinfo/:id
- 请求方法：get
- 请求参数

| 参数名 | 类型   | 参数说明 | 备注     |
| ------ | ------ | -------- | -------- |
| id     | number | 用户id   | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| status | 200      | 删除成功 |

- 响应数据

```json
{
    "status": 200,
    "msg": "删除用户信息成功"
}
```

## 1.5. 医生管理

### 1.3.1. 就诊医生查询列表

- 请求路径：/doctor/getinfo
- 请求方法：get
- 请求参数

| 参数名               | 类型   | 参数说明     | 备注     |
| -------------------- | ------ | ------------ | -------- |
| pagenum              | number | 当前页码     | 不能为空 |
| pagesize             | number | 每页显示条数 | 不能为空 |
| name          | string | 待诊医生姓名 | 可以为空 |
| worker_number | number | 工号         | 可以为空 |
| deaparment    | string | 部门         | 可以为空 |

- 响应参数

  | 参数名               | 类型   | 参数说明     |
  | -------------------- | ------ | ------------ |
  | id                   | number | 医生id       |
  | name          | string | 医生姓名     |
  | sex           | number | 医生性别     |
  | worker_number | number | 工号         |
  | id_card       | number | 身份证号     |
  | phone         | number | 手机号       |
  | adress        | string | 地址         |
  | education     | string | 毕业学校     |
  | email         | string | 邮箱         |
  | deparment     | string | 科室         |
  | family        | number | 家庭医生0，1 |

- 响应数据

```json
{
    "status": 200,
    "msg": "查询成功",
    "data": [
        {
            "id": 4,
            "name": "大大大",
            "sex": 3,
            "id_card": 3,
            "phone": "3",
            "worker_number": 2532532,
            "adress": "23额2",
            "education": "1",
            "email": "1",
            "deaparment": "1",
            "family": 1,
        },
        {
            "id": 5,
            "name": "大叔大婶",
            "sex": 5,
            "id_card": 5,
            "phone": "5",
            "worker_number": 56557,
            "adress": "二恶",
            "education": "1",
            "email": "1",
            "deaparment": "1",
            "family": null,
        }
    ],
    "total": 5
}
```

### 1.3.2. 根据id查询医生信息

- 请求路径：/doctor/info/:id
- 请求方法：get
- 请求参数

| 参数名 | 类型   | 参数说明 | 备注     |
| ------ | ------ | -------- | -------- |
| id     | number | 医生id   | 不能为空 |

- 响应参数

  | 参数名               | 类型   | 参数说明     |
  | -------------------- | ------ | ------------ |
  | name          | string | 医生姓名     |
  | sex           | number | 医生性别     |
  | worker_number | number | 工号         |
  | id_card       | number | 身份证号     |
  | phone         | number | 手机号       |
  | adress        | string | 地址         |
  | education     | string | 毕业学校     |
  | email         | string | 邮箱         |
  | deparment     | string | 科室         |
  | family        | number | 家庭医生0，1 |

- 响应数据

```json
{
    "status": 200,
    "msg": "获取医生信息成功",
    "data": {
        "id": 5,
        "name": "大叔大婶",
        "sex": 5,
        "id_card": 5,
        "phone": "5",
        "worker_number": 56557,
        "adress": "二恶",
        "education": "1",
        "email": "1",
        "deaparment": "1",
        "family": null,
    }
}
```

### 1.3.4. 添加就诊医生信息

- 请求路径：/doctor/insertinfo

- 请求方法：post

- 请求参数

  | 参数名               | 类型   | 参数说明     | 备注     |
  | -------------------- | ------ | ------------ | -------- |
  | name          | string | 医生姓名     | 不能为空 |
  | sex           | number | 医生性别     | 不能为空 |
  | worker_number | number | 工号         | 不能为空 |
  | id_card       | number | 身份证号     | 不能为空 |
  | phone         | number | 手机号       | 不能为空 |
  | adress        | string | 地址         | 不能为空 |
  | education     | string | 毕业学校     | 不能为空 |
  | email         | string | 邮箱         | 不能为空 |
  | deparment     | string | 科室         | 可以为空 |
  | family        | number | 家庭医生0，1 | 可以为空 |

- 响应参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| status | 200      | 添加成功 |

- 响应数据

```json
{
    "status": 200,
    "msg": "新增待诊医生信息成功"
}
```

 

### 1.3.5. 修改就诊医生信息

- 请求路径：doctor/updateinfo

- 请求方法：post

- 请求参数

  | 参数名               | 类型   | 参数说明     | 备注     |
  | -------------------- | ------ | ------------ | -------- |
  | id                   | number | 当前医生id   | 不能为空 |
  | name          | string | 医生姓名     | 不能为空 |
  | sex           | number | 医生性别     | 不能为空 |
  | worker_number | number | 工号         | 不能为空 |
  | id_card       | number | 身份证号     | 不能为空 |
  | phone         | number | 手机号       | 不能为空 |
  | adress        | string | 地址         | 不能为空 |
  | education     | string | 毕业学校     | 不能为空 |
  | email         | string | 邮箱         | 不能为空 |
  | deparment     | string | 科室         | 可以为空 |
  | family        | number | 家庭医生0，1 | 可以为空 |

- 响应参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| status | 200      | 修改成功 |

- 响应数据

```json
{
    "status": 200,
    "msg": "医生信息修改成功！"
}
```



### 1.3.6. 根据id删除就诊医生

- 请求路径：doctor/deleteinfo/:id
- 请求方法：get
- 请求参数

| 参数名 | 类型   | 参数说明 | 备注     |
| ------ | ------ | -------- | -------- |
| id     | number | 医生id   | 不能为空 |

- 响应参数

| 参数名 | 参数说明 | 备注     |
| ------ | -------- | -------- |
| status | 200      | 删除成功 |

- 响应数据

```json
{
    "status": 200,
    "msg": "删除医生信息成功"
}
```

## 1.5. 任务管理

### 1.3.1. 待派遣用户列表

- 请求路径：/task/need

- 请求方法：get

- 请求参数

  无

- 响应参数

  | 参数名    | 类型   | 参数说明       |
  | --------- | ------ | -------------- |
  | id        | number | 待派遣用户id   |
  | name | string | 待派遣用户姓名 |

- 响应数据

```json
{
    "status": 200,
    "msg": "获取待派遣用户信息成功",
    "data": [
        {
            "name": "彭思远",
            "id": 18
        }
    ]
}
```

### 1.3.2. 根据id(可传多个)提交用户派遣状态

- 请求路径：/task/assigned

- 请求方法：post

- 请求参数

  | 参数名 | 类型 | 参数说明     |
  | ------ | ---- | ------------ |
  | id     | 数组 | 待派遣用户id |

- 响应参数

  | 参数名 | 类型 | 参数说明 |
  | ------ | ---- | -------- |
  | status | 200  | 待派成功 |

- 

- 响应数据

```json
{
  
        "id":[27,20],
        "tid":12 
 
}

{
    "status": 200,
    "msg": "指派成功"
}
```



### 1.3.2. 待预诊用户列表

- 请求路径：/task/diagnose

- 请求方法：get

- 请求参数

  描述：不需要派遣医生，状态为待就诊用户列表数据

  | 参数名 | 类型 | 参数说明     |
  | ------ | ---- | ------------ |
  | id     | 数组 | 待就诊用户id |

- 响应参数、

  注：响应参数与待诊用户参数一致！

- 响应数据

```json
 {
    "status": 200,
    "msg": "获取待诊断用户信息成功",
    "data": [
        {
            "id": 16,
            "name": "王宏杰",
            "sex": 1,
            "id_card": "622202200103014569",
            "phone": "15523652213",
            "email": "123@qq.com",
            "medical_cards": "花痴",
            "adress": "花痴",
            "anamnesis": "花痴",
            "family_genetic": "无",
            "describe": "花痴",
            "drug_allergy": "花痴",
            "family_need": 0,
            "status": 1,
            "id": null,
            "record": "",
            "result": "",
            "is_delete": 0
        }
    ]
}
```

### 1.3.2. 提交待诊结果

- 请求路径：/task/result

- 请求方法：post

- 请求参数

  描述：不需要派遣医生，状态为待就诊用户单个操作提交

- 响应参数、

  注：响应参数与待诊用户参数一致！

  | 参数名 | 类型 | 参数说明 |
  | ------ | ---- | -------- |
  | status | 200  | 诊断成功 |

- 响应数据

```json
 {
    "status": 200,
    "msg": "诊断结果提交成功！",
}
```

###  

