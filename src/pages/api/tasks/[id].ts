import { NextApiRequest, NextApiResponse } from "next"
import { conn } from "@/src/utils/database";

export default async (req: NextApiRequest, res:NextApiResponse) => {

    const {method, query, body} = req;
    console.log(query);

    switch (method) {
        case 'GET':
            try {
            const text = 'SELECT * FROM tasks WHERE id = $1'
            const value = [query.id]
            const result = await conn.query(text, value)
            if (result.rows.length === 0){
                return res.status(404).json({message: "Proceso no encontrado"})
            }
            console.log(result)
            return res.status(200).json(result.rows[0])
            } catch (error: any) {
                return res.status(500).json({message: error.message})
            }
            
        case 'PUT':
            try {
                const text = 'UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *'
                const value = [body.title, body.description, query.id]
                const result = await conn.query(text, value)
                if (result.rows.length === 0){
                    return res.status(404).json({message: "Proceso no encontrado"})
                }
                console.log(result)
                return res.status(200).json(result.rows[0])
                } catch (error: any) {
                    return res.status(500).json({message: error.message})
                }
            
        case 'DELETE':
            try {
                const text = 'DELETE FROM tasks WHERE id = $1 RETURNING *'
                const value = [query.id]
                const result = await conn.query(text, value)
                if (result.rowCount === 0){
                    return res.status(404).json({message: "Proceso no encontrado"})
                }
                console.log(result)
                return res.status(200).json(result.rows[0])
                } catch (error: any) {
                    return res.status(500).json({message: error.message})
                }
            
        default:
            res.status(400).json("method no allowed")
            break;
    }

    res.json('something unique')
}