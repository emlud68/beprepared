import logo from '../assets/logo.png'
import TimerPreference from '../components/timer-preference/timer-preference.component'
import FilterPreference from '../components/filter-preference/filter-preference.component'

const Preferences = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-20 mb-20">
        <div className="max-w-[calc(100vh_/_3)]">
          <img src={logo} alt="logo" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-sans">Be Prepared</h1>
      </div>
      <div>
        <div className="flex sm:flex-row flex-col items-center sm:justify-center gap-20">
          <TimerPreference />
          <FilterPreference />
        </div>
      </div>
    </div>
  )
}

export default Preferences
