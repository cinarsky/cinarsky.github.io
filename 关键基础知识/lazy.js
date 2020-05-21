function lazy(f) {
  return class Lazy extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        loading: true
      }

      f().then(Comp => {
        this.Comp = Comp
        this.setState({
          loading: false
        })
      })
    }

    render() {
      if (this.state.loading) {
        return null
      } else {
        var Comp = this.Comp
        var {children, ...props} = this.props
        return <Comp {...props}>{children}</Comp>
      }
    }
  }
}



var Comp = React.lazy2({
  compoent: () => import('./MyComponent'),
  loading: (props) => {
    return <div>loading...</div>
  },
  error: (props) => {
    return <div>error</div>
  },
  timeout: 3000,
  delay: 200,
})

function lazy(f) {
  class Lazy extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        loading: true
      }

      f().then(Comp => {
        this.Comp = Comp
        this.setState({
          loading: false
        })
      })
    }

    render() {
      if (this.state.loading) {
        return <span style={{color:'red'}}>loading...</span>
      } else {
        var Comp = this.Comp
        var {children, forwardRef, ...props} = this.props
        return <Comp ref={forwardRef} {...props}>{children}</Comp>
      }
    }
  }

  return React.forwardRef((props, ref) => {
    return <Lazy {...props} forwardRef={ref}/>
  })
}



React.lazy2 = function(obj) {
  return function LazyComp(props) {
    var [delay, setDelay] = useState(false)
    setTimeout(() => {
      setDelay(true)
    }, obj.delay)

    var [error, setError] = useState(false)
    var [timeout, setTO] = useState(false)
    setTimeout(() => {
      setDelay(true)
    }, obj.timeout)

    var [loading, setLoading] = useState(false)
    var [ActuralComp, setActuralComp] = useState(null)

    obj.compoent().then(comp => {
      setLoading(false)
      setActuralComp(comp)
    }).catch(() => {
      setError(true)
    })

    if (error) {
      var Loading = obj.loading
      return <Loading {...props}/>
    }

    if (delay) {
      var Delay = obj.delay
      return <Delay {...props}/>
    }

    if (loading) {
      return null
    } else {
      return <ActuralComp {...props}/>
    }
  }
}