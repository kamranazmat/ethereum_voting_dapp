// Import the page's CSS. Webpack will know what to do with it.
import '../stylesheets/app.css';

// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract';

// Import our contract artifacts and turn them into usable abstractions.
import voting_artifacts from '../../build/contracts/Voting';


// MetaCoin is our usable abstraction, which we'll use through the code below.
const Voting = contract(voting_artifacts);

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
let accounts;
let account;

const candidates = {'Rama': 'candidate-1', 'Nick': 'candidate-2', 'Jose': 'candidate-3'};

window.App = {
    start: function () {
        let self = this;

        // Bootstrap the MetaCoin abstraction for Use.
        Voting.setProvider(web3.currentProvider);

        // Get the initial account balance so it can be displayed.
        web3.eth.getAccounts(function (err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }

            if (accs.length === 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }

            accounts = accs;
            account = accounts[0];
        });

        // Load all candidates and their votes
        self.loadCandidatesAndVotes();
    },

    loadCandidatesAndVotes: function () {
        let candidateNames = Object.keys(candidates);

        for (let i = 0; i < candidateNames.length; i++) {
            Voting.deployed()
                .then((f) => {
                    f.totalVotesFor.call(candidateNames[i])
                        .then((f) => {
                            $(`#${candidates[candidateNames[i]]}`).html(f.c[0]);
                        })
                    }
                );
        }
    },

    // Vote for a candidate
    voteForCandidate: function () {
        let candidateName = $('#candidate').val();

        Voting.deployed()
            .then((i) => {
                i.voteForCandidate(candidateName, {from: account})
                    .then((f) => {
                        i.totalVotesFor.call(candidateName)
                            .then((f) => {
                                $(`#${candidates[candidateName]}`).html(f.c[0]);
                            })
                    })
            });
    }
};

window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
    }

    App.start();
});
