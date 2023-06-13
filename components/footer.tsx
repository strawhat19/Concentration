export default function Footer(props) {
    return <footer style={props.style}>
    <div className="left">
        <a className="hoverLink" href="/">Home  <i className="fas fa-undo"></i></a>
    </div>
        <div className="right"> Piratechs <i className="fas fa-copyright"></i>{new Date().getFullYear()}</div>
</footer>
}