import CreatePlaylistForm from "./CreatePlaylistForm";
import styles from "./CreatePlaylist.module.css";
const CreatePlaylist = () => {
    return <>
        <div className={styles["create-playlist-page"]}>
            <div className={styles["card"]}>
                <h2 className={styles["title"]}>Create Playlist Page</h2>

                <CreatePlaylistForm />
            </div>
        </div>

    </>
};

export default CreatePlaylist;