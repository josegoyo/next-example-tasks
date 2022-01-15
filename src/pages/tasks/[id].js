export default function TaskDetails({ data }) {
    console.log(data);
    return <div>Task Details</div>;
}

export async function getServerSideProps(context) {
    const data = {
        msg: "smn si me mando llamar sin recargar!!!",
    };

    return {
        props: { data }, // will be passed to the page component as props
    };
}
