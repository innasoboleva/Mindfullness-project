import React, { useState } from 'react';
import './coaches.css'
// import { Carousel } from 'react-bootstrap';

function Coaches() {
    const [isIsCarouselOpen, setIsIsCarouselOpen] = useState(false);

    const toggleCarousel = () => {
        setIsIsCarouselOpen(!isIsCarouselOpen);
    };

    return (
        <React.Fragment>
            <div>
                <div className='coach-block'>
                    <h1>НАШИ КОУЧИ ‌И ПРЕПОДАВАТЕЛИ</h1>
                    <div className='coach'>
                        <div className='coach-info'>
                            <h2>ИРА СОБОЛЕВА</h2>
                            <h3>Коуч ICF, бизнес-коуч с психологическим образованием, инструктор майндфулнес</h3>
                            <p>Инструктор практик майндфулнес, коуч ICF, Основатель Mindful Club. Главная цель всего что делает Ира это раскрыть человеку его собственные желания и стремления, какими страшными и удивительными они не казались.
                                ‌В MINDFUL CLUB ведет групповой коучинг и практики майндфулнес.</p>
                            <button onClick={toggleCarousel}>{isCarouselOpen ? 'Закрыть' : 'Узнать больше!'} </button>
                        </div>
                        <div className='coach-image'>
                            <img src="/img/IS_portrait_coach.jpg" alt="Ira Soboleba coach portrait"></img>
                        </div>
                    </div>
                    {isIsCarouselOpen && (

                        <div id="carouselExampleIndicators" class="carousel carousel-dark slide" data-ride="carousel">
                            <ol class="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                            </ol>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img class="d-block w-100" src="/img/SI1.jpg" alt="Irina Soboleva's professional diploma"></img>
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="/img/SI2.png" alt="Irina Soboleva's professional certificate for coach and mentor"></img>
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="/img/SI3.png" alt="Irina Soboleva - associate certified coach"></img>
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="/img/SI4.png" alt="Irina Soboleva's certified of achievement"></img>
                                </div>
                                <div class="carousel-item">
                                    <img class="d-block w-100" src="/img/SI5.jpg" alt="Irina Soboleva's diploma"></img>
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                               
                            </a>
                            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            </a>
                            <br></br>
                        </div>
                        
                    )}
                    <div className='coach coach-reverse'>
                        <div className='coach-info'>
                            <h2>АЛЕНА АТАЯНЦ</h2>
                            <h3>инструктор майндфулнес, эмбодимент-коуч</h3>
                            <p>Эмбодимент коуч и инструктор практик осознанности в травма-информированном подходе. Создаёт доверительную атмосферу, подходит индивидуально к каждому клиенту бережно и с заботой. Работает с телом и эмоциями, обучает навыкам внимательности и сердечности.
                                ‌В Mindful Club ведет практики mindfulness и группу эмбодимент коучинга.</p>
                            <button>Видео практик и медитаций</button>
                            <button>Узнать больше!</button>
                        </div>
                        <div className='coach-image'>
                            <img src="/img/AA_portrait_coach.jpg" alt="Alena Atayanc coach portrait"></img>
                        </div>
                    </div>


                    <div className='coach'>
                        <div className='coach-info'>
                            <h2>ВИКТОРИЯ ЕВМЕНОВА</h2>
                            <h3>инструктор майндфулнес</h3>
                            <p>Инструктор практик майндфулнес и MBSR. Вела практики в России, Казахстане, Мексике, Индонезии для клиентов из 10+ стран мира. Преподаватель медитации в благотворительном проекте «Антитревога» с 2022. Участвовала как инструктор практик осознанности в фестивале «Иная» в Индонезии.
                                ‌В MINDFUL CLUB ведет практики майндфулнес медитаций.</p>
                            <button>Узнать больше!</button>
                        </div>
                        <div className='coach-image'>
                            <img src="/img/VE_portrait_coach.jpg" alt="Victoriya Evmenova coach portrait"></img>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>);
}

export default Coaches;