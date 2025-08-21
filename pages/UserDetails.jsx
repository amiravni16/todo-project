const { useParams, useNavigate } = ReactRouter
const { useSelector } = ReactRedux

import { updateBalance, addActivity, updateUserPreferences, updateUserPrefs } from '../store/actions/user.actions.js'
import '../assets/style/pages/UserDetails.css'

export function UserDetails() {
    const { userId } = useParams()
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.user)
    const [isEditing, setIsEditing] = React.useState(false)
    const [editForm, setEditForm] = React.useState({
        fullname: '',
        preferences: {
            theme: 'light',
            notifications: true,
            language: 'en'
        },
        prefs: {
            color: 'black',
            bgColor: 'white'
        }
    })

    React.useEffect(() => {
        if (user && user._id === userId) {
            setEditForm({
                fullname: user.fullname || '',
                preferences: {
                    theme: user.preferences?.theme || 'light',
                    notifications: user.preferences?.notifications !== undefined ? user.preferences.notifications : true,
                    language: user.preferences?.language || 'en'
                },
                prefs: {
                    color: user.prefs?.color || 'black',
                    bgColor: user.prefs?.bgColor || 'white'
                }
            })
        }
    }, [user, userId])

    function handleInputChange(ev) {
        const { name, value, type, checked } = ev.target
        if (name.startsWith('preferences.')) {
            const prefKey = name.split('.')[1]
            setEditForm(prev => ({
                ...prev,
                preferences: {
                    ...prev.preferences,
                    [prefKey]: type === 'checkbox' ? checked : value
                }
            }))
        } else if (name.startsWith('prefs.')) {
            const prefKey = name.split('.')[1]
            setEditForm(prev => ({
                ...prev,
                prefs: {
                    ...prev.prefs,
                    [prefKey]: value
                }
            }))
        } else {
            setEditForm(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    async function handleSave() {
        try {
            if (user) {
                // Update user preferences
                await updateUserPreferences(user._id, editForm.preferences)
                
                // Update user prefs
                await updateUserPrefs(user._id, editForm.prefs)
                
                // Add activity for the update
                await addActivity(user._id, `Updated profile: ${editForm.fullname}`)
            }
            setIsEditing(false)
        } catch (err) {
            console.error('Cannot save user details:', err)
        }
    }

    function handleCancel() {
        setEditForm({
            fullname: user.fullname || '',
            preferences: {
                theme: user.preferences?.theme || 'light',
                notifications: user.preferences?.notifications !== undefined ? user.preferences.notifications : true,
                language: user.preferences?.language || 'en'
            },
            prefs: {
                color: user.prefs?.color || 'black',
                bgColor: user.prefs?.bgColor || 'white'
            }
        })
        setIsEditing(false)
    }

    if (!user) {
        return <div className="user-details-page">Please log in to view user details.</div>
    }

    const isOwnProfile = user._id === userId

    return (
        <div className="user-details-page">
            <div className="user-details-container">
                <div className="user-header">
                    <h1>User Profile</h1>
                    {isOwnProfile && (
                        <button 
                            className="edit-btn"
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    )}
                </div>

                <div className="user-info-section">
                    <h2>Basic Information</h2>
                    <div className="info-row">
                        <label>Username:</label>
                        <span>{user.username}</span>
                    </div>
                    <div className="info-row">
                        <label>Full Name:</label>
                        {isEditing && isOwnProfile ? (
                            <input
                                type="text"
                                name="fullname"
                                value={editForm.fullname}
                                onChange={handleInputChange}
                                placeholder="Enter full name"
                            />
                        ) : (
                            <span>{user.fullname}</span>
                        )}
                    </div>
                    <div className="info-row">
                        <label>Balance:</label>
                        <span className="balance-display">${user.balance || 10000}</span>
                    </div>
                    <div className="info-row">
                        <label>Member Since:</label>
                        <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>

                {isOwnProfile && (
                    <div className="user-preferences-section">
                        <h2>Preferences</h2>
                        <div className="preferences-grid">
                            <div className="preference-item">
                                <label>Theme:</label>
                                {isEditing ? (
                                    <select
                                        name="preferences.theme"
                                        value={editForm.preferences.theme}
                                        onChange={handleInputChange}
                                    >
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                        <option value="auto">Auto</option>
                                    </select>
                                ) : (
                                    <span>{user.preferences?.theme || 'light'}</span>
                                )}
                            </div>
                            <div className="preference-item">
                                <label>Notifications:</label>
                                {isEditing ? (
                                    <input
                                        type="checkbox"
                                        name="preferences.notifications"
                                        checked={editForm.preferences.notifications}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <span>{user.preferences?.notifications ? 'Enabled' : 'Disabled'}</span>
                                )}
                            </div>
                            <div className="preference-item">
                                <label>Language:</label>
                                {isEditing ? (
                                    <select
                                        name="preferences.language"
                                        value={editForm.preferences.language}
                                        onChange={handleInputChange}
                                    >
                                        <option value="en">English</option>
                                        <option value="es">Spanish</option>
                                        <option value="fr">French</option>
                                    </select>
                                ) : (
                                    <span>{user.preferences?.language || 'en'}</span>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {isOwnProfile && (
                    <div className="user-prefs-section">
                        <h2>Display Preferences</h2>
                        <div className="preferences-grid">
                            <div className="preference-item">
                                <label>Text Color:</label>
                                {isEditing ? (
                                    <input
                                        type="color"
                                        name="prefs.color"
                                        value={editForm.prefs.color}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <span style={{ color: user.prefs?.color || 'black' }}>
                                        {user.prefs?.color || 'black'}
                                    </span>
                                )}
                            </div>
                            <div className="preference-item">
                                <label>Background Color:</label>
                                {isEditing ? (
                                    <input
                                        type="color"
                                        name="prefs.bgColor"
                                        value={editForm.prefs.bgColor}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <span style={{ 
                                        backgroundColor: user.prefs?.bgColor || 'white',
                                        color: user.prefs?.color || 'black',
                                        padding: '2px 6px',
                                        borderRadius: '3px'
                                    }}>
                                        {user.prefs?.bgColor || 'white'}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="user-activities-section">
                    <h2>Recent Activities</h2>
                    {user.activities && user.activities.length > 0 ? (
                        <div className="activities-list">
                            {user.activities.slice(-10).reverse().map((activity, index) => (
                                <div key={index} className="activity-item">
                                    <span className="activity-text">{activity.txt}</span>
                                    <span className="activity-time">
                                        {new Date(activity.at).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No activities yet.</p>
                    )}
                </div>

                {isEditing && isOwnProfile && (
                    <div className="edit-actions">
                        <button className="save-btn" onClick={handleSave}>
                            Save Changes
                        </button>
                        <button className="cancel-btn" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                )}

                <div className="back-actions">
                    <button className="back-btn" onClick={() => navigate('/')}>
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    )
}
