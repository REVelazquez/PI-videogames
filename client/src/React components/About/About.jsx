import Style from './About.module.css'

const About = ()=>{
    return(
    <div key='About Container' className={Style.wrapper}>
        <h1 key='About tittle' className={Style.tittles}>About the Proyect</h1>
        <p key='Txt1'className={Style.txt}> This Proyect born as a way of examinate the knowledge of the developer for the academy SoyHenry.</p>
        <p key='Txt 2' className={Style.txt}>But at the same time is a theme that I liked, for that reason my plans are to continue exploring what to do in it</p>
        <h3 key='Developer tittle' className={Style.tittles}>About the developer</h3>
        <span key= 'Developer area' className={Style.devContainer}>
            <p key='TextDev' className={Style.txt}> I'm Rodrigo Velazquez, born in city of Santa Fe, Argentina. After sometime in diferents carrers i decided to make a change and go for something i was posponing for a long time</p>
            <p key='more text dev' className={Style.txt}> For this reason, i attempted to dedicate to get better at something I was looking after by a lot of time</p>
        </span>


    </div>)
}


export default About