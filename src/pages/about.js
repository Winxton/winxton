import React from "react"
import Layout from '../components/layout'
import civilpixelsLogo from '../images/civilpixels.png'
import hyperspeedLogo from '../images/hyperspeed.png'
import pianoshelfLogo from '../images/pianoshelf.png'
import SEO from '../components/seo'


const About = () => {
    return (
        <Layout>
            <SEO title="About"/>
            <h1 className={"title"}>Winxton</h1>

            <section className="section">
                <div className="container">
                <h2 className="title is-4">About me</h2>
                <p>I am a Software Developer in Toronto and I like easy to use, minimal, and cute products.
                    Here I’ll jot down some snippets and shower thoughts.
                    I’ve previously worked with full stack web development, data pipeline at Twitter, and Android at Snapchat
                    and am currently on creating software tools for ecommerce at <a href="https://rvere.com">rvere</a> with <a href="http://alexanderlam.ca">Alex</a>.
                </p>
                </div>
            </section>

            <h2 className="title is-4" style={{paddingTop: '1em'}}>Projects</h2>
            
            <div className="columns">
                <div className="column">
                    <div className="card">
                        <header className="card-header">
                            <div className="card-header-title">
                                <img src={hyperspeedLogo} alt="hyperspeed logo" width="30em"/>
                                <a style={{paddingLeft: '0.5rem'}} href="https://apps.shopify.com/hyperspeed">
                                    Hyperspeed
                                </a>
                            </div>
                        </header>

                        <div className="card-content">
                            <div className="content">
                            Hyperspeed is a Shopify extension for automatic speed optimization using image & video lazy-loading,
                            critical CSS, minifying assets, third party caching, and link-preloading.
                            </div>
                        </div>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                        <header className="card-header">
                            <div className="card-header-title">
                                <img src={civilpixelsLogo} alt="civilpixels logo" width="30em"/>
                                <a style={{paddingLeft: '0.5rem'}} href="https://apps.shopify.com/civil-pixels">CivilPixels</a>
                            </div>
                        </header>

                        <div className="card-content">
                            <div className="content">
                            CivilPixels is a tag manager for Shopify.
                            Similar to Google Tag Manager, it is used for third party event tracking to measure ROI on ads.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="columns">
                <div className="column">
                    <div className="card">
                        <header className="card-header">
                            <div className="card-header-title">
                                <img src={pianoshelfLogo} alt="pianoshelf logo" width="30em"/>
                                <a style={{paddingLeft: '0.5rem'}} href="http://www.pianoshelf.com">Pianoshelf</a>
                            </div>
                        </header>

                        <div className="card-content">
                            <div className="content">
                                <p>Pianoshelf is platform for sharing sheet music. It was first written as I was learning programming and piano in middle school, and rewritten
                                with my UWaterloo classmates and friends <a href="https://ankitsardesai.ca">Ankit Sardesai</a>, <a href="https://ryanly.ca">Ryan Ly</a>, <a href="https://shamak.github.io/">Shamak Dutta</a>&nbsp;
                                with the more modern redux / reactjs / python.
                                
                                It currently has 80k monthly active users.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                        <header className="card-header">
                            <div className="card-header-title">
                                <a href="https://www.timecouncil.com">timecouncil</a>
                            </div>
                        </header>

                        <div className="card-content">
                            <div className="content">
                            <p>Mint is a popular app that tracks how you spend your money by connecting to your credit cards and bank accounts,
                            and summarizes spending over time.</p>
                            <p>Similarly, timecouncil lets you view transactions, goals, and budget our time.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default About;
