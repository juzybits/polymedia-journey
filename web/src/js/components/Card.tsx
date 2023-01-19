import './Card.less';

export function Card()
{
    return <>
<div className='profile-card'>
<div className='flip-container'>
<div className='flipper'>

    <div className='card front'>
        <div className='card-background'>
            <article>
                <div className='card-body'></div>
                <header className='card-name'>
                    <div>
                        <h1>Name</h1>
                        <i className='grow'></i>
                    </div>
                </header>

                <div className='art'>
                    <img src='https://avatars.githubusercontent.com/u/96890594?v=4' alt='profile picture' width='100%' height='auto' />
                </div>

                <header className='card-type'>
                    <div>
                        <h2>0x1d39...b33f</h2>
                    </div>
                </header>
                <div className='textBox'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec tincidunt lectus.</p>
                    <p>Sed malesuada pretium nibh ac lobortis. Sed sit amet nibh aliquam, dictum justo quis.</p>
                    <blockquote>
                        <p>“Quisque ullamcorper turpis id magna consectetur, sed molestie nunc pretium.”</p>
                        <p>—Condimentum</p>
                    </blockquote>
                </div>
                <header className='powerToughness'>
                    <div>
                        <h2>1/1</h2>
                    </div>
                </header>

                <footer>
                    <p>100/100 C<br />
                    ABC ‧ EN - @juzybits</p>
                    <h6>2023 Polymedia</h6>
                </footer>

            </article>

        </div>
    </div> {/* card front */}

    <div className='card back'>
        <img src='img/Back.jpg' alt='Back' width='100%' height='auto' />
    </div>

</div> {/* flipper */}
</div> {/* flip-container */}
</div> {/* profile-card */}
</>
}
