import Footer from '../components/footer'
import Navbar from '../components/navbar'
import "../style/about.css"

function About() {
    return (
        <>
            <div className="about">
                <Navbar />
                <img src="https://www.thehungercoalition.org/wp-content/uploads/2023/11/community-gardens.png" />
                <div className="about-text">
                    <h1>ABOUT US</h1>
                    <h3>Our Mission</h3>
                    <p>To create sustainable communities through shared gardening spaces and foster connections between local gardeners.
                        Community Garden Connect was founded with the vision of making community gardening more accessible, organized, and enjoyable for everyone. We believe in the power of growing together and sharing knowledge.
                        Community Garden Connect was founded with the vision of making community gardening more accessible, organized, and enjoyable for everyone. We believe in the power of growing together, sharing knowledge, and building stronger communities through the love of gardening. Our platform is designed to bring together individuals of all ages, backgrounds, and skill levels who share a passion for cultivating green spaces. Whether you're a seasoned gardener or just planting your first seed, you'll find a welcoming space here to learn, connect, and thrive.</p>
                    <h3>🌻Join Us in Growing a Greener Tomorrow</h3>
                    <p>Whether you're looking to grow fresh food, beautify your neighborhood, or simply find joy in the soil, Community Garden Connect is your digital companion on the journey. Let’s grow together — one plant, one person, one community at a time.</p>
                    <h3>🌟Our Features</h3>
                    <ul>
                        <li>Manage community garden plots.</li>
                        <li>Attend or organize local garden events.</li>
                        <li>Share and discover sustainable gardening resources.</li>
                        <li>Connect with fellow gardeners through messaging and forums.</li>
                        <li>Track progress, tasks, and contributions to your garden community.</li>
                    </ul>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default About
