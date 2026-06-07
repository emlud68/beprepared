import logo from '../assets/logo.png'
import TimerPreference from '../components/timer-preference/timer-preference.component'

const Preferences = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-20">
        <div className="max-w-[calc(100vh_/_3)]">
          <img src={logo} alt="logo" />
        </div>
        <h1 className="text-5xl font-sans">Be Prepared</h1>
      </div>
      <div className="flex justify-center">
        <div className="w-1/2">
          <TimerPreference />
        </div>
        <div className="w-1/2"></div>
      </div>
    </div>
  )
}

export default Preferences
