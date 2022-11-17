## 社区健康管理系统数据库表设计

> ### 用户表 （user）

| 列名     | 类型    | 长度 | 是否不为空 | 描述      |
| -------- | ------- | ---- | ---------- | --------- |
| id       | int     | 10   | 是         | 用户id    |
| username | VarChar | 30   | 是         | 用户名称  |
| password | VarChar | 200  | 是         | 用户密码  |
| roles    | int     | 1    | 是         | 角色(0,1) |

​	

> ### 待诊用户表（users）

| 列名                | 类型    | 长度 | 是否不为空 | 描述                          |
| ------------------- | ------- | ---- | ---------- | ----------------------------- |
| id                  | int     | 10   | 是         | 待诊用户id                    |
| name           | varchar | 12   | 否         | 姓名                          |
| sex            | int     | 30   | 是         | 性别                          |
| id_card        | varchar | 9    | 是         | 身份证                        |
| phone          | varchar |      | 是         | 电话                          |
| adress         | varchar | 255  | 是         | 住址                          |
| email          | varchar | 255  | 否         | 邮箱                          |
| medical_cards  | varchar | 255  | 否         | 医保情况                      |
| anamnesis      | varchar | 500  | 否         | 既往病史                      |
| Family_genetic | varchar | 500  | 否         | 家族遗传史                    |
| drug_allergy   | varchar | 500  | 是         | 药品过敏情况                  |
| describe       | varchar | 500  | 是         | 个人症状描述                  |
| family_need    | int     | 1    | 否         | 是否需要家庭医生上门面诊(0,1) |
| status         | int     | 1    | 是         | 当前状态:(0:已完成,1:待就诊)  |
| record         | varchar | 500  | 否         | 就诊记录                      |
| result         | varchar | 500  | 否         | 就诊结果                      |
| id           | int     | 10   | 否         | 对应医师id                    |
| is_delete           | int     | 1    | 是         | 0，1，逻辑删除                |

> ### 医生表 （doctors）

| 列名                 | 类型    | 长度 | 是否不为空 | 描述                                 |
| -------------------- | ------- | ---- | ---------- | ------------------------------------ |
| id                   | int     | 10   | 是         | 医生id                               |
| name          | VarChar | 30   | 是         | 医生名称                             |
| sex           | VarChar | 200  | 是         | 医生性别                             |
| worker_number | int     | 100  | 是         | 工号                                 |
| id_card       | int     | 100  | 是         | 身份证                               |
| phone         | VarChar | 225  | 是         | 手机号                               |
| adress        | VarChar | 225  | 是         | 地址                                 |
| education     | VarChar | 225  | 是         | 毕业学校                             |
| email         | VarChar | 225  | 是         | 邮件                                 |
| deparment     | VarChar | 225  | 是         | 科室（0,内科1外科,2.理疗,3家庭医生） |
| certificate   |         |      |            | 执业医师资格证书                     |
| family        | int     | 1    | 否         | 0,1是否为家庭医生                    |
| is_delete            | int     | 1    | 否         | 0,1逻辑删除                          |

​	

