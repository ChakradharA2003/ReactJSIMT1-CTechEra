import {Link, withRouter} from 'react-router-dom'

import './index.css'

const Course = props => {
  const {id, name, logoUrl} = props
  // console.log(props)
  return (
    <Link to={`/courses/${id}`} className="link-item">
      <li className="list-item">
        <img src={logoUrl} alt={name} className="course-image" />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}
export default withRouter(Course)
