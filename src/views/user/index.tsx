import { Link } from 'react-router-dom'


export default function User() {
    return (
        <div>
            <h1>这里是用户页</h1>
            <Link to="/home">跳转主页</Link>
        </div>
    )
}
