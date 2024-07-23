import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header/index'
import Course from '../Course/index'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    courses: [],
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.courses.map(course => ({
        id: course.id,
        logoUrl: course.logo_url,
        name: course.name,
      }))
      // console.log(updatedData)
      this.setState({courses: updatedData, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" height="40" width="40" color="#4656a1" />
    </div>
  )

  successView = () => {
    const {courses} = this.state
    return (
      <div className="home-container">
        <h1 className="heading">Courses</h1>
        <ul className="courses-list">
          {courses.map(each => (
            <Course
              key={each.id}
              id={each.id}
              name={each.name}
              logoUrl={each.logoUrl}
            />
          ))}
        </ul>
      </div>
    )
  }

  failureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" onClick={this.getCourses} className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.loading:
        return this.loadingView()
      case apiConstants.success:
        return this.successView()
      case apiConstants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <Header />
        {this.renderView()}
      </div>
    )
  }
}
export default Home
