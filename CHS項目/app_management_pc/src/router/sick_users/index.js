const mainBasic = () => import("@/views/layouts/MainBasic.vue");
const sickUserList = () => import("@/views/sick_users/SickUserList.vue");
const insertSick = () => import("@/views/sick_users/InsertSickUser.vue");
const updateSick = () => import("@/views/sick_users/UpdateSickList.vue");
export default [
  {
    path: "/mainBasic",
    name: "mainBasic",
    component: mainBasic,
    redirect: "/mainBasic/sick",
    children: [
      {
        path: "sick",
        name: "sickList",
        component: sickUserList,
      },
      {
        path: "insertsick",
        name: "insertsick",
        component: insertSick,
      },
      {
        path: "updatesick",
        name: "updatesick",
        component: updateSick,
      },
    ],
  },
];
