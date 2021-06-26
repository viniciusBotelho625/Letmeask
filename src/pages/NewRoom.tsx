import { Link, useHistory} from 'react-router-dom'
import { FormEvent } from 'react';
import illustrationImg from '../assets/images/illustration.svg'; 
import logoImg from '../assets/images/logo.svg'; 
import '../styles/auth.scss'; 
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { database } from '../services/firebase';

export function NewRoom() {
    const { user } = useAuth();
    const [newRomm, setNewRoom] = useState('');
    const history = useHistory();

    async function handleCreateRoom(e: FormEvent) {
        e.preventDefault()

        if (newRomm.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRomm,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala"
                            onChange={e => setNewRoom(e.target.value)}
                            value={newRomm}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}

function TestContext(TestContext: any): { value: any; setValue: any; } {
    throw new Error('Function not implemented.');
}
