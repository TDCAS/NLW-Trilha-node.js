type Message = { pollOptionId:string, votes: number}
type Subscriber = (message: Message) => void
//Patten
class VotingPubSub {
    private channels: Record<string, Subscriber[]> = {}
    // Função que ouve as publicações
    subscribe(pollId: string, subscriber: Subscriber) {
        if(!this.channels[pollId]){
            this.channels[pollId] = []
        }

        this.channels[pollId].push(subscriber)
    }
    // Onde é publicado messagens 
    publish(pollId: string, message: Message){
        if(!this.channels[pollId]){
            return;
        }
        for(const subscriber of this.channels[pollId]){
            subscriber(message)
        }
    }
}

export const voting = new VotingPubSub()