import { ToggleButton } from "../cmps/ToggleButton.jsx"

const { useState } = React

export function Home() {
    
    const [isOn, setIsOn] = useState(false)

    return (
        <section className="home-page">
            <div className="home-hero">
                <h1>Todo's R Us!</h1>
                <p>Organize your life, one task at a time. A modern, intuitive todo application built with React and Redux.</p>
                <div className="cta-buttons">
                    <a href="#/todo" className="btn primary">Get Started</a>
                    <a href="#/about" className="btn secondary">Learn More</a>
                </div>
            </div>
            
            <div className="features-grid">
                <div className="feature-card">
                    <div className="feature-icon">📝</div>
                    <h3>Smart Task Management</h3>
                    <p>Create, edit, and organize your todos with ease. Set priorities and track completion progress.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">🎨</div>
                    <h3>Personalized Experience</h3>
                    <p>Customize colors and preferences to match your style. Track your activities and earn rewards.</p>
                </div>
                <div className="feature-card">
                    <div className="feature-icon">📊</div>
                    <h3>Progress Tracking</h3>
                    <p>Visual progress bars show your completion rate. Stay motivated and see your productivity grow.</p>
                </div>
            </div>
            
            <ToggleButton val={isOn} setVal={setIsOn} />
            {isOn && <img src="../assets/img/todo.png" alt="" style={{marginTop: '40px', maxWidth: '300px', borderRadius: '15px'}} />}
        </section>
    )
}