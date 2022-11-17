import mainBasic from "@/views/layouts/MainBasic.vue";
import doctorList from "@/views/doctors/DoctorList.vue";
import insertDoctor from "@/views/doctors/InsertDoctor.vue";
import taskDoctor from "@/views/doctors/Tasking.vue";
import Diagnose from "@/views/doctors/PreliminaryClinical.vue";
export default [
  {
    path: "/mainBasic",
    name: "mainBasic",
    component: mainBasic,
    redirect: "/doctor",
    children: [
      {
        path: "/doctor",
        name: "doctorList",
        component: doctorList,
      },
      {
        path: "/insertdoctor",
        name: "insertdoctor",
        component: insertDoctor,
      },
      //任务派遣
      {
        path: "/taskdoctor",
        name: "TaskDoctor",
        component: taskDoctor,
      },
      //在线预诊
      {
        path: "/diagnose",
        name: "Diagnose",
        component: Diagnose,
      },
    ],
  },
];
