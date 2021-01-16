import React, {Component} from "react";
import './Epiloges.css';
import {Link} from 'react-router-dom';

function ChoicesLink(){
    return(
        <div classsName ="report-link">
            <Link to='/choices'>
                Ενημέρωση για τις επιλογές μου
            </Link>
        </div>
    )
}

class ChoicesPage extends Component{

    state={
        visibleID: 0
    }

    changeState(clickedID){
        var newState = Object.assign({},this.state);
        newState.visibleID=clickedID;
        this.setState(newState);
    }

    render()
    {
        var choices = [" Όσον αφορά τις συνθήκες εργασίας, οι τηλεργαζόμενοι απολαμβάνουν τα ίδια δικαιώματα, που διασφαλίζονται από την ισχύουσα νομοθεσία και τις συλλογικές συμβάσεις για συγκρίσιμους εργαζόμενους μέσα στις εγκαταστάσεις της επιχείρησης. Ωστόσο, για να ληφθούν υπόψη οι ιδιαιτερότητες της τηλεργασίας μπορεί να χρειαστούν ειδικές συμπληρωματικές συλλογικές ή ατομικές συμβάσεις. Στη χώρα μας, νομοθετική μνεία στην τηλεργασία συναντάται στον ν. 2639/1998. Το άρθρο 1: «ειδικές μορφές απασχόλησης». προβλέπει ότι: «Η συμφωνία μεταξύ εργοδότη και απασχολούμενου για παροχή υπηρεσιών ή έργου, για ορισμένο ή αόριστο χρόνο, ιδίως στις περιπτώσεις αμοιβής κατά μονάδα εργασίας (φασόν), τηλεργασίας, κατ` οίκον απασχόλησης, τεκμαίρεται ότι υποκρύπτει σύμβαση εξαρτημένης εργασίας, εφόσον η εργασία παρέχεται αυτοπροσώπως, αποκλειστικά ή κατά κύριο λόγο στον ίδιο εργοδότη για εννέα (9) συνεχείς μήνες». Αξίζει να σημειωθεί πως η τηλεργασία έχει οικειοθελή χαρακτήρα για τους ενδιαφερόμενους, εργαζόμενο και εργοδότη. Η τηλεργασία μπορεί να αποτελεί μέρος της αρχικής περιγραφής της θέσης εργασίας του εργαζόμενου ή μπορεί να υπάρξει συμφωνία εκ των υστέρων. Αν η τηλεργασία δεν είναι μέρος της αρχικής περιγραφής της θέσης και αν ο εργοδότης κοινοποιήσει προσφορά τηλεργασίας, ο εργαζόμενος μπορεί να δεχθεί ή να αρνηθεί αυτή την προσφορά. Ωστόσο, με την από 11.3.2020 Πράξη Νομοθετικού Περιεχομένου παρέχεται η δυνατότητα στους εργοδότες με δική τους (μονομερή) απόφαση να ορίσουν ότι θα εφαρμόζεται από κάποιους εργαζομένους τους το σύστημα της εξ αποστάσεως εργασίας. Όταν ένας εργαζόμενος εκφράζει την επιθυμία για μια θέση τηλεργασίας, ο εργοδότης μπορεί να δεχθεί ή να αρνηθεί αυτό το αίτημα. Η μετάβαση στην τηλεργασία από μόνη της δεν θίγει το καθεστώς απασχόλησης του τηλεργαζόμενου, μεταβάλλει μόνο τον τρόπο με τον οποίο πραγματοποιείται η εργασία. Η άρνηση ενός εργαζόμενου να αποδεχθεί την τηλεργασία δεν αποτελεί από μόνη της αιτία διακοπής της εργασιακής σχέσης ούτε τη μεταβολή των όρων και συνθηκών απασχόλησης αυτού του εργαζόμενου."
        , "Συναφώς, διευκρινίζεται πως η  προστασία των ομάδων αυξημένου κινδύνου με χορήγηση ειδικής άδειας απουσίας και παροχή τηλεργασίας, όπου είναι εφικτό, δεν τελεί πλέον στη διακριτική ευχέρεια του αιτούντος, αλλά αποτελεί υποχρέωση της Διοίκησης για την απομάκρυνσή τους από την αυτοπρόσωπη παροχή εργασίας, οπότε και εφόσον από τα στοιχεία που τηρεί η Υπηρεσία γνωρίζει ότι ο υπάλληλος υπάγεται στις ομάδες αυξημένου κινδύνου, τότε θα προβαίνει σε κάθε περαιτέρω ενέργεια αυτεπαγγέλτως για την απασχόλησή τους και την προστασία τους κατά τα οριζόμενα στην ΚΥΑ και σύμφωνα με τις οδηγίες που έχουν δοθεί στις σχετικές εγκυκλίους.Επιπλέον, στις περιπτώσεις αυτές και υπό τις συνθήκες της πανδημίας, οι οποίες καθιστούν σχεδόν αδύνατη πλέον τη χορήγηση αδειών λόγω εξάντλησης αυτών, οι Υπηρεσίες θα προβαίνουν, εφόσον το επιθυμεί ο υπάλληλος γονέας, στην κατά προτεραιότητα παροχή εξ αποστάσεως εργασίας, όπου αυτό είναι εφικτό βάσει των καθηκόντων που ασκεί ο/η υπάλληλος ή στην εκ περιτροπής παροχή εργασίας. Υπενθυμίζεται επίσης ότι οι υπάλληλοι αυτοί δύνανται να παρέχουν την εργασία τους σε ωράριο διαφορετικό από το παγίως προβλεπόμενο εφόσον αυτό συνάδει τόσο με την προστασία των τέκνων όσο και με την εξυπηρέτηση των αρμοδιοτήτων της δημόσιας υπηρεσίας.",
        "Οι εργαζόμενοι της των οποίων οι συμβάσεις εργασίας τίθενται σε αναστολή, είναι δικαιούχοι της αποζημίωσης ειδικού σκοπού και οι επιχειρήσεις-εργοδότες που κάνουν χρήση των ρυθμίσεων αναστολής, υποχρεούνται να μην προβούν σε μειώσεις προσωπικού με καταγγελία των συμβάσεων εργασίας κατά το χρονικό διάστημα από 1/6/2020 έως 30/9/2020 και σε περίπτωση πραγματοποίησής τους, οι καταγγελίες αυτές είναι άκυρες.Οι εργαζόμενοι σε επιχειρήσεις -εργοδότες κύριων και μη κύριων ξενοδοχειακών και τουριστικών καταλυμάτων και τουριστικών λεωφορείων, εποχικής λειτουργίας, που δεν θα επαναλειτουργήσουν κατά τη θερινή τουριστική περίοδο 2020, με δικαίωμα υποχρεωτικής επαναπρόσληψης είναι δικαιούχοι της αποζημίωσης ειδικού σκοπού, για το χρονικό διάστημα από 1/6/2020 έως 30/9/2020.Στο άρθρο 3 προβλέπεται ότι οι εργαζόμενοι, των οποίων η σύμβαση εργασίας τελεί σε αναστολή, σε επιχειρήσεις- εργοδότες, είναι δικαιούχοι αποζημίωσης ειδικού σκοπού, ύψους πεντακοσίων τριάντα τεσσάρων (534) ευρώ, ανά μήνα, για το χρονικό διάστημα από 1/6/2020 έως 30/9/2020, εφόσον δεν έχουν σύμβαση εξαρτημένης εργασίας σε άλλον εργοδότη. Σε περίπτωση κατά την οποία η αναστολή σύμβασης εργασίας ανακληθεί οριστικά η αποζημίωση ειδικού σκοπού υπολογίζεται κατ' αναλογία των ημερών αναστολής.Η αποζημίωση ειδικού σκοπού είναι ακατάσχετη, αφορολόγητη και δεν συμψηφίζεται με οποιαδήποτε οφειλή."]
        return(
            <div>
                <div className="breadcrumb">
                    <Link to = "/" className="not-selected">Θέματα</Link>
                    <p className="arrow">&gt;&gt;</p>
                    <p>covid-19</p>
                    <p className="arrow">&gt;&gt;</p>
                    <p className="selected">Πληροφόριση για τις επιλογές των εργαζομένων</p>
                </div>
                <p className="title">Επιλέξτε ένα απο τα παρακάτω θέματα:</p>
                <div className="choices-info">
                    <div className="choices">
                        <div className="choice-item" onClick={() => this.changeState(0)}>
                            <p>Τηλεργασία</p>
                        </div>
                        <div className="choice-item" onClick={() => this.changeState(1)}>
                            <p>Άδειες</p>
                        </div>
                        <div className="choice-item" onClick={() => this.changeState(2)}>
                            <p>Συμβάσεις Εργασίας</p>
                        </div>
                    </div>
                    <p className="keimeno">{choices[this.state.visibleID]}</p>
                </div>
            </div>
        )
    }
}

export{
    ChoicesLink,
    ChoicesPage
}