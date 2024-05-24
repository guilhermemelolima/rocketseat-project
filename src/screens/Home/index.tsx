import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, FlatList , Alert } from 'react-native';

import { Participant } from '../../components/Participant';

import { styles } from './styles';

export default function Home() {
	const [participants, setParticipants] = useState<string[]>([])
	const [participantName, setParticipantName] = useState('')
  
    function handleParticipantAdd(){
		if (participants.includes(participantName)) {
			return Alert.alert('Participante existe', `Já existe um participante na lista como o nome de  ${participantName}`)
		}
		setParticipants(prevState =>  [...prevState , participantName])
		setParticipantName('')
		// ...array - desestrutura o array despejado seus itens
		// prevState - valor anterior presente dentro do participants
    }

	function handleParticipantRemove(name : string){
		Alert.alert('Remover', `Deseja remover o participante ${name}?`,[
			{ text: 'Sim', onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name)) },
			{ text: 'Não', style: 'cancel' }
		])
	}

    return(
		<View style={styles.container}>

			<Text style={styles.eventName}> Nome do Evento </Text>
			<Text style={styles.eventDate}> Sexta, 24 de Maio de 2024. </Text>
		
			<View style={styles.form}>
				<TextInput 
					style={styles.input}
					placeholder='Nome do participante'
					placeholderTextColor='#6b6b6b'
					// keyboardType='numeric'
					// keyboardType='email-address'
					
					// onChangeText={eventText => setParticipantName(eventText)}
					onChangeText={setParticipantName}
					
					value={participantName}
				/>

				<TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
					<Text style={styles.buttonText}> + </Text>
				</TouchableOpacity>
			</View>
			
			<FlatList 
				data={participants}
				keyExtractor={item => item}
				renderItem={({ item }) => (
					<Participant 
						key={item}
						name={item}
						onRemove={() => handleParticipantRemove(item)
					}/>
				)}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={() => (
					<Text style={styles.listEmptyText}>
						Ninguem Chegou no evento ainda? Adicione participantes.
					</Text>
				)}
			/>

			{/* <ScrollView showsVerticalScrollIndicator={false}>
				{
					participants.map(participant => (
						<Participant 
							key={participant} // chave com o nome do usuário que deve ser unico
							name={participant} 
							onRemove={() => handleParticipantRemove(participant)}
						/>
					)) 
				}
			</ScrollView> */}
			{
				/**
					**Diferença entre ScrollView e FlatList
					- Ambos adicionam a rolagem

					*!SCROLLVIEW (- performática, recomendada para listas menores)
					- Carrega todos os elementos/componentes na tela mesmo que eles não estejam disponiveis

					*?FLATLIST (+ performática, recomendada para listas grandes)
					- Carrega apenas aquilo que cabe na tela, os demias itens são não carregados de imediato
				*/
			}
		</View>
  	);
}
