import { useEffect } from "react";
import { fetchSongs } from "../../store/features/playerSlice";
import { useAppDispatch } from "../../store/store";
import Section from "../Section/Section";
import Container from "../UI/Container";

const MainContent = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchSongs());
    }, []);

    return <>
        <Container width={1990}>
            <Section title={'Main'}></Section>
            {/* <Section title={'Newly listed'} songs={songs2}></Section> */}
            {/* <Section title={'Pop'} songs={songs2}></Section> */}

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
        </Container>
    </>
};

export default MainContent;