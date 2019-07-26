import Home from '@views/Home';
// import User from '@views/User/index';
// import Login from '@views/loginReg/Login';
// import TodoPage from '@views/Todos/index';
// import Topics from '@views/Topics/index';
// import Topic from '@views/Topics/Topic';
import Error from '@views/Error/NoMatch';

const routes = [
    {
        path:"/",
        exact: true,
        component: Home,
        requiresAuth: false,
    },
    {
        path:"",
        exact: true,
        component: Home,
        requiresAuth: false,
    },
    {
        path: "/home",
        exact: true,
        component: Home,
        requiresAuth: false,
    }, 
    // {
    //     path: '/login',
    //     component: Login,
    //     requiresAuth: false,
    // },
    // {
    //     path: "/user",
    //     component: User,
    //     requiresAuth: true, //需要登陆后才能跳转的页面
    // },
    // {
    //     path: "/todo",
    //     component: TodoPage,
    //     requiresAuth: true,
    // },
    // {
    //     path: "/topics",
    //     component: Topics,
    //     requiresAuth: true,
    //     routes: [
    //         {
    //             path: "/topics/:topicId",
    //             component: Topic,
    //             requiresAuth: true,
    //         },
    //     ]
    // },
    {
        // path: '/error',
        // name: '404',
        path: '*',
        component: Error,
        requiresAuth: false,
    },
];

export default routes;