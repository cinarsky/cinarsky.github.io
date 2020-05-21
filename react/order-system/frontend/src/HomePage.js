import React from 'react'
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom'
import { Button } from 'antd';

export default () => {
    return <div className='HomePages'>
        <h1 >漫语点餐系统</h1>
        <div>
        <Button type='ghost' shape='round' size='large' ><Link to='login'>登录</Link></Button>
        <Button type='ghost' shape='round' size='large' ><Link to='register'>注册</Link></Button>
        </div>
    </div>
}
