/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { whoAmI } from '@/app/lib/api/user.api';
import { checkSecureRoutes } from '@/app/utils/constants';
import { API } from '@/app/utils/helper';
import { type AxiosInstance } from 'axios';
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState, type Dispatch, type FC, type ReactNode, type SetStateAction } from 'react';
// import { type ToastOptions, ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// export const toasterConfig: ToastOptions<{}> = {
//   position: 'bottom-right',
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined
// }

interface LoginUserData {
  id: string
  name: string
  email: string
  role: string
  companyName: string | null
}

interface LayoutContextProps {
  loginUserData: LoginUserData | null
  setLoginUserData: Dispatch<SetStateAction<LoginUserData | null>>
}

interface LayoutContextProviderProps {
  children: ReactNode
}

const initialState: LayoutContextProps = {
  loginUserData: null,
  setLoginUserData: (data: unknown) => {}
}

export const LayoutContext = createContext(initialState)

export const LayoutContextProvider: FC<LayoutContextProviderProps> = ({ children }) => {
  const router = useRouter();
  const pathName = usePathname();
  const [loginUserData, setLoginUserData] = useState<LoginUserData | null>(initialState.loginUserData)
  const [initialLoading, setInitialLoading] = useState(true)

  const axiosInstance: AxiosInstance = API()

  axiosInstance.interceptors.request.use(
    (c) => {
      return c
    },
    async (error) => {
      return await Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    (response) => { return response },
    async (error) => { return await Promise.reject(error)}
  )

  const getUserData = async (): Promise<void> => {
    try {
      setInitialLoading(true)
      const response = await whoAmI()
      if (response.success) {
        setLoginUserData(response?.data)
        router.push("/dashboard");
      } else {
        router.push("/");
      }
      setInitialLoading(false)
    } catch (error) {
      console.log('Get login user data initial:', error);
      if(checkSecureRoutes(pathName)) router.push("/");
      setInitialLoading(false);
    }
  }
  useEffect(() => {
      getUserData()
  }, [])

  if (initialLoading) {
    return (
      <h1>Loading</h1>
    )
  }

  return (
    <LayoutContext.Provider value={{ loginUserData, setLoginUserData }}>
      {children}
      {/* <ToastContainer
       position="top-right"
       autoClose={5000}
       hideProgressBar={false}
       newestOnTop={false}
       closeOnClick rtl={false}
       pauseOnFocusLoss
       draggable
       pauseOnHover={true}
       className="toast-container"
       toastClassName="dark-toast"
       style={{ zIndex: 99999 }} /> */}
    </LayoutContext.Provider>
  )
}