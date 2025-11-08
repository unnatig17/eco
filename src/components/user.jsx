const User=() => {
//   const [dumps, setDumps] = useState([]);
//   const [classes, setClasses] = useState([]);
//   const [rows, setRows] = useState([]);
//   const [form, setForm] = useState({ dumpLocationId:"", wasteClassificationId:"", collectionDate:"", quantityKg:"" });
//     useEffect(() => {
//     fetch("http://localhost:4000/api/dumps").then(r=>r.json()).then(setDumps);
//     fetch("http://localhost:4000/api/classifications").then(r=>r.json()).then(setClasses);
//     fetch("http://localhost:4000/api/collections").then(r=>r.json()).then(setRows);
//   }, []);

//   const submit = async (e) => { 
//     e.preventDefault();
//     await fetch("http://localhost:4000/api/collections", {
//       method: "POST",
//         headers: { "Content-Type":"application/json" },
//         body: JSON.stringify(form),
//     });
//     const latest = await fetch("http://localhost:4000/api/collections").then(r=>r.json());
//     setRows(latest);
//     setForm({ dumpLocationId:"", wasteClassificationId:"", collectionDate:"", quantityKg:"" });
//   }
//     const onChange = (e)=> setForm(f=>({...f, [e.target.name]: e.target.value}));
    return (

    <div className="p-6 space-y-4">
      <h1>User Collections</h1>
    </div>
  );
}
export default User;
