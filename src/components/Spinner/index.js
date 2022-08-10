const Spinner = ({loading,title}) => {
    return loading ? <i className='fas fa-circle-notch fa-spin' /> : title
  }
export default Spinner