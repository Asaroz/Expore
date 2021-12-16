import deleteDescendants from '../libs/deleteDescendants.js';
import '../scss/UniverseDescPrompt.scss'

export default function UniverseDescPrompt (props) {
    const handleClose = () => props.setShow(false);

    const info = props.itemInfo;
    const universes = props.universes;
    const setUniverses = props.setUniverses;

    const handleDelete = async () => {
        const message = await deleteDescendants({ _id: info._id, universeId: info.universeId });
        universes.splice(info.index, 1);
        setUniverses([...universes]);
        alert(message);
        // Not required because the parent that rendered the component is deleted
        // handleClose();
    }

    return <div className="modal">
        {info.descendants.length === 1 ? 
            <h3>This universe has {info.descendants.length} subitem are you sure you wanna delete it?</h3> :
            <h3>This universe has {info.descendants.length} subitems are you sure you wanna delete them all?</h3>
        }
        <button onClick={handleDelete} testId="confirmDelete">
            Yes I would like to delete the universe and the {info.descendants.length === 1 ? "subitem" : "subitems" }
        </button>
        <button onClick={handleClose}>
            Cancel
        </button>
    </div>
}