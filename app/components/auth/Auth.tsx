import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import tw from 'twrnc';
import { useAuth } from '../../hooks/useAuth';
import Loader from '../ui/Loader'
import Field from '../ui/Field';
import Button from '../ui/Button';

interface IData {
  email: string
  password: string
}


const Auth = () => {
  const {isLoading, login, register} = useAuth()
  
  const [data, setData] = useState<IData>({} as IData)
  const [isReg, setIsReg] = useState(false);

  const authHandler = async () => {
    const {email, password} = data

    if(isReg) await register(email, password)
    else await login(email, password)

    setData({} as IData)

  }

  return (
    <View style={tw`h-full w-full bg-white pt-16`}>
      <View style={tw`mx-5 justify-center items-center h-full`}>
        <View style={tw`w-9/12`}>

          <Text style={tw`text-center text-gray-800 text-2xl font-bold mb-2`}>
            {isReg ? 'Sign Up' : 'Sign in'}
          </Text>     

        {isLoading ? <Loader/> : <></>}
        <Field val={data.email} placeholder='Enter email' 
        onChange={val => setData({...data, email: val})}/>

        <Field val={data.password} placeholder='Enter password' 
        onChange={val => setData({...data, password: val})}
        isSecure={true}/>

        <Button title='Lets go!' onPress={authHandler}/>

        <Pressable onPress={() => setIsReg(!isReg)}>
          <Text style={tw`text-gray-800 opacity-30 text-right text-sm`}>
            {isReg? 'Login' : 'Register'}
          </Text>

        </Pressable>

        </View>
      </View>
    </View>

  );
}

export default Auth;
