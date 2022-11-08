const { Router } = require('express');
const {Pokemon,Type} = require ('../db.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require ('axios'); 


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//traer datos de la api
const getApiInfo = async () => {
    /*const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon');
    const apiInfo = await apiUrl.data.results.map(el=>{
        
        return{
            id: el.id,
            name: el.name,
            types: el.types.map((t) => t.type.name),
            img: el.sprites.other.home.front_default,
             hp: el.stats[0].base_stat,
            attack:el.stats[1].base_stat,
            defense: el.stats[2].base_stat,
            speed: el.stats[3].base_stat,
            height: el.height,
            weight: el.weight,
        }
    })
    
    return apiInfo;
}*/

try {
    const callingApi = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
    const apiInfo = callingApi.data.results.map((el) => {
        return axios.get(el.url)
    })

    const arrayPokes = await Promise.all(apiInfo).then((poke) => {//Promise.all espera a que todas las promesas sean resultadas
        const pokeArray = poke.map((element) => {//el es el objeto que se esta iterando
            return {

                id: element.data.id,
                name: element.data.name,
                hp: element.data.stats[0].base_stat,
                attack: element.data.stats[1].base_stat,
                defense: element.data.stats[2].base_stat,
                speed: element.data.stats[5].base_stat,
                height: element.data.height,
                weight: element.data.weight,
                types: element.data.types.map((element) => element.type),
                img: element.data.sprites.other.home.front_default,

            }
        });
        return pokeArray;// retorna el array de objetos
    });
    return arrayPokes;// retorna el array de pokemones
} catch (error) {
    console.log(error);// si hay un error se imprime en consola

}
}

// incluyo el modelo type
const getDbInfo = async () => {
    return await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });
}

// uno las dos funciones anteriores
const getAllPokemons = async ()=>{
    /*const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}*/

try {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();

    return [...apiInfo, ...dbInfo];
} catch (error) {
    console.log(error);

}
}

// rutas

router.get('/pokemons', async (req,res) =>{
    // const name= req.query.name
    // let pokemonsTotal = await getAllPokemons();
    // if(name){
    //     let pokemonName = await pokemonsTotal.filter(el=>el.name.toLowerCase().include(name.toLowerCase()))
    //     pokemonName.lenght ? 
    //     res.status(200).send(pokemonName):
    //     res.status(404).send('No esta el Pokemon');
    // }else {
    //     res.status(200).send(pokemonsTotal)
    // }
    const name = req.query.name;
    const totalPokemons = await getAllPokemons();

    try {
        if (name) {
            let pokemonName = await totalPokemons.filter((pokemon) =>//
                pokemon.name.toLowerCase()// toLowerCase convierte todo el texto en minusculas
                    .split('')// elimina los espacios
                    .join('')// 
                    .includes(name.toLowerCase().split(" ").join("")));//

            pokemonName.length !== 0
                ? res.status(200).send(pokemonName)
                : res.status(404).send({ message: "Pokemon no existe" });

        } else {
            res.status(200).send(totalPokemons);
        }
    } catch (error) {
        res.send({ message: "Error" });

    }
})

router.get('/types', async (req,res) =>{
    const result = await axios.get("https://pokeapi.co/api/v2/type");// obtenemos todos los tipos de pokemon
    try {

        const types = result.data.results.map((el) => el.name).flat();// obtenemos los nombres de los tipos

        const getTypes = [...new Set(types)];// Eliminamos los duplicados

        getTypes.forEach((type) => { // Guardamos los tipos en la base de datos
            Type.findOrCreate({ // Buscamos el tipo en la base de datos
                where: {
                    name: type // Si no existe lo creamos
                },
            })
        });
        const allTypes = await Type.findAll();// Buscamos todos los tipos en la base de datos
        res.json(allTypes);

    } catch (error) {
        console.log(error);
    }
})

router.get('/pokemons/:id', async (req,res) =>{
    const id = req.params.id;
    const totalPokemons = await getAllPokemons();

    try {


        if (id) {
            let pokemonId = await totalPokemons.filter((el) => el.id == id);
            pokemonId.length !== 0
                ? res.status(200).send(pokemonId)
                : res.status(404).send(`Pokemon con Id: ${id} no existe`);

        }


    } catch (error) {
        console.log(error);

    }

})

router.post('/pokemons', async (req,res) =>{
    const {
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        types,
        img
    } = req.body;
    const newPokemon = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        img,
    });

    const typeDb = await Type.findAll({// dentro de la base de datos busca todos los tipos
        where: { name: types }
    })
    newPokemon.addTypes(typeDb)

    res.send("Pokemon creado");

})

// router.delete('/delete/:id', async (req,res)=>{
//     const id = req.params.id
//     try {


//         await Pokemon.destroy({ where: { id: id } }) // se elimina el pokemon de la base de datos
//         res.send('se elimino el pokemon')
//     } catch (error) {
//         console.log(error);
//     }
// })

module.exports = router;
