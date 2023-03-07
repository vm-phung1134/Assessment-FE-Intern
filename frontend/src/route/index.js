import  Login  from "../login/index"
import  UpdateUser from "../update/index"

const publicRoutes = [
    {
      path: "/",
      component: Login,
    },
    {
      path: "/update/:id",
      component: UpdateUser,
    },
]

export {publicRoutes}