import { useState } from "react"
import Navbar from "../components/navbar"
import Section from "../components/herosection"
function Index() {
    const herodata={
        title: "🍃 WELCOME TO ",
        title1: "COMMUNITY GARDEN CONNECT 🍃",
        description: "To plant a garden is to believe in tomorrow. - Audrey Hepburn",
        src: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        button: "Get Started"
    }

    const [array, setArray] = useState([
        {
            id: 1,
            title: "Watering Plants",
            description: "Watering plants is a great way to keep them healthy and thriving.",
            src: "https://media.istockphoto.com/id/1248915720/photo/farmers-hand-watering-a-young-plant.webp?a=1&b=1&s=612x612&w=0&k=20&c=GAk9e4eAqS0Iwl3mcUsf7cXbN9HoeviLzKFLUWrtsAk="
        },
        {
            id: 2,
            title: "Garden Management",
            description: "Garden management is a crucial part of maintaining a healthy and productive garden.",
            src: "https://media.istockphoto.com/id/157482648/photo/colorful-garden-landscape-and-grassy-lawn.webp?a=1&b=1&s=612x612&w=0&k=20&c=Bh2W30ljXg29gLol66pVVS6hj5K_ty75WUOichAKSmg="
        },
        {
            id: 3,
            title: "Fertilizing Plants",
            description: "Fertilizing plants is a great way to give them the nutrients they need to grow",
            src: "https://images.unsplash.com/photo-1624806993335-5c8a05d85929?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmVydGlsaXppbmclMjBwbGFudHN8ZW58MHx8MHx8fDA%3D"
        }
    ])
    return (
        <>
        <Navbar/>
        <Section {...herodata}/>
            <div id="hero1">
                <h2 id="h3">Why Choose Us?</h2>
                <div id="garden">
                    {array.map((item) => {
                        return (
                            <div key={item.id} className="card">
                                <img src={item.src}></img>
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Index