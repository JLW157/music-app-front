interface ISearchPlaylistInput {
    onChange: (term: string) => void
}
const SearchPlaylistInput = ({ onChange }: ISearchPlaylistInput) => {
    return <>
        <input type="text" onChange={e => onChange(e.target.value)}></input>
    </>
};

export default SearchPlaylistInput;