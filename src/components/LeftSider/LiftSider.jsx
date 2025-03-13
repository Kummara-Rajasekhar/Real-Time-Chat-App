import React from 'react'
import './LeftSider.css'
import assets from '../../assets/assets'
const LiftSider = () => {
    return (
        <div className='ls'>
            <div className='ls-top'>
                <div className="ls-nav">
                    <img src={assets.logo} className='logo' alt="" />
                    <div className="menu">
                        <img src={assets.menu_icon} alt="" />
                    </div>
                </div>
                <div className="ls-serach">
                    <img src={assets.search_icon} alt="" />
                    <input type="text" placeholder='Serach here...' />
                </div>

            </div>

            <div className="ls-list">
                {
                    Array(12).fill("").map((item,i) => (
                        <div key={i} className="friends">
                            <img src={assets.profile_img} alt="" />
                            <div>
                                <p>Richard Sanford</p>
                                <span>Hello, How are you?</span>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default LiftSider
