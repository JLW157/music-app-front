import '../../App.css';
import MusicPlayer from './MusicPlayer/MusicPlayer';
import MainNavigation from './Navigation/MainNavigation';
import classes from "./Main.module.css";
import { useContext, useState } from 'react';
import Section from '../Section/Section';
import { songs } from '../../data';
import SectionMusicContext from '../../stores/sections/sectionMusicContext';
const Main = () => {
    const {showPlayer} = useContext(SectionMusicContext);

    console.log("SHow player in Main", showPlayer);
    return <>
        <div className={classes["main-container"]}>
            <MainNavigation />

            <Section title={'Main'} songs={songs}></Section>

            <div>
                <h2>Hello world</h2>
                <div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum id dolorum praesentium natus eos iusto ad
                        at obcaecati magni mollitia animi nisi, sit enim laborum aliquid assumenda. Recusandae consequuntur
                        magni nulla natus. Cum molestias accusantium obcaecati ipsum iusto adipisci itaque omnis sint magni
                        suscipit maxime necessitatibus, molestiae est hic nobis! Ut vero, nobis aut provident dolorum fugit rem,
                        quasi quis animi tempora corporis quia dolorem. Magnam aut ducimus nemo, maiores illum aliquam delectus.
                        Id laboriosam tempore unde veniam fuga mollitia iste impedit delectus praesentium cupiditate debitis
                        architecto, vitae voluptatibus ad saepe dolore aut consequatur perferendis neque numquam aperiam! Magni,
                        voluptatibus.</p>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum id dolorum praesentium natus eos iusto ad
                        at obcaecati magni mollitia animi nisi, sit enim laborum aliquid assumenda. Recusandae consequuntur
                        magni nulla natus. Cum molestias accusantium obcaecati ipsum iusto adipisci itaque omnis sint magni
                        suscipit maxime necessitatibus, molestiae est hic nobis! Ut vero, nobis aut provident dolorum fugit rem,
                        quasi quis animi tempora corporis quia dolorem. Magnam aut ducimus nemo, maiores illum aliquam delectus.
                        Id laboriosam tempore unde veniam fuga mollitia iste impedit delectus praesentium cupiditate debitis
                        architecto, vitae voluptatibus ad saepe dolore aut consequatur perferendis neque numquam aperiam! Magni,
                        voluptatibus.</p>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum id dolorum praesentium natus eos iusto ad
                        at obcaecati magni mollitia animi nisi, sit enim laborum aliquid assumenda. Recusandae consequuntur
                        magni nulla natus. Cum molestias accusantium obcaecati ipsum iusto adipisci itaque omnis sint magni
                        suscipit maxime necessitatibus, molestiae est hic nobis! Ut vero, nobis aut provident dolorum fugit rem,
                        quasi quis animi tempora corporis quia dolorem. Magnam aut ducimus nemo, maiores illum aliquam delectus.
                        Id laboriosam tempore unde veniam fuga mollitia iste impedit delectus praesentium cupiditate debitis
                        architecto, vitae voluptatibus ad saepe dolore aut consequatur perferendis neque numquam aperiam! Magni,
                        voluptatibus.</p>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum id dolorum praesentium natus eos iusto ad
                        at obcaecati magni mollitia animi nisi, sit enim laborum aliquid assumenda. Recusandae consequuntur
                        magni nulla natus. Cum molestias accusantium obcaecati ipsum iusto adipisci itaque omnis sint magni
                        suscipit maxime necessitatibus, molestiae est hic nobis! Ut vero, nobis aut provident dolorum fugit rem,
                        quasi quis animi tempora corporis quia dolorem. Magnam aut ducimus nemo, maiores illum aliquam delectus.
                        Id laboriosam tempore unde veniam fuga mollitia iste impedit delectus praesentium cupiditate debitis
                        architecto, vitae voluptatibus ad saepe dolore aut consequatur perferendis neque numquam aperiam! Magni,
                        voluptatibus.</p>
                </div>
            </div>
            {showPlayer === true && <MusicPlayer />}
        </div>
    </>
};

export default Main;