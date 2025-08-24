const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux
import { ActivityList } from '../cmps/ActivityList.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { utilService } from '../services/util.service.js'
import { updateUser } from '../store/actions/user.actions.js'

export function UserDetails() {
    const loggedInUser = useSelector((storeState) => storeState.user.user)
    const dispatch = useDispatch()
    const [userDetails, setUserDetails] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (loggedInUser) loadUserData()
    }, [])

    function loadUserData() {
        setUserDetails({
            fullname: loggedInUser.fullname || '',
            color: (loggedInUser.preferences && loggedInUser.preferences.color) || '#eeeeee',
            bgColor: (loggedInUser.preferences && loggedInUser.preferences.bgColor) || '#191919',
            activities: loggedInUser.activities || []
        })
    }


    function onEditUser(ev) {
        ev.preventDefault()
        const userToUpdate = {
            fullname: userDetails.fullname,
            preferences: { color: userDetails.color, bgColor: userDetails.bgColor }
        }
        dispatch(updateUser(userToUpdate))
            .then(() => {
                showSuccessMsg('User updated successfully!')
                // Apply the saved colors to the page
                utilService.setCssVarVal('--clr1', userDetails.bgColor)
                utilService.setCssVarVal('--clr2', userDetails.color)
            })
            .catch(err => {
                console.error('Cannot update user:', err)
                showErrorMsg('Cannot update user')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break
        }
        setUserDetails((prevUser) => ({ ...prevUser, [field]: value }))
    }



    if (!loggedInUser || !userDetails) return <div>No user</div>
    const { activities, fullname, color, bgColor } = userDetails
    return (
        <div className='container'>
            <h1>Profile</h1>
            <form className='activities-form' onSubmit={onEditUser}>
                <label htmlFor="fullname">Name:</label>
                <input type="text" id="fullname" name="fullname" value={fullname} onChange={handleChange} />
                
                <label htmlFor="color">Text Color:</label>
                <div className="color-input-group">
                    <input type="color" name="color" value={color} onChange={handleChange} />
                    <span className="color-preview" style={{ color: color }}>Sample Text</span>
                </div>
                
                <label htmlFor="bgColor">Background Color:</label>
                <div className="color-input-group">
                    <input type="color" name="bgColor" value={bgColor} onChange={handleChange} />
                    <span className="color-preview" style={{ backgroundColor: bgColor, color: color, padding: '5px', borderRadius: '3px' }}>Sample Background</span>
                </div>
                
                <button type="submit">Save Changes</button>
            </form>

            {activities &&
                <ActivityList activities={activities} />
            }
        </div>
    )
}
