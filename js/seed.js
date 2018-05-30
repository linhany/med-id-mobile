const RNFS = require('react-native-fs');

const healthRecordPath = RNFS.DocumentDirectoryPath + '/healthrecord.medid';
const keyPath = RNFS.DocumentDirectoryPath + '/key.medid';
import PATIENT_HR_SEED from './patienthrseed';
const PATIENT_KEY_SEED = "10D9920D8D941"

seedHealthRecord = (replaceExisting) => {
  RNFS.exists(healthRecordPath)
  .then(exists => {
    if (!replaceExisting && exists) {
      console.log("Healthrecord already exists, not seeding");
      return
    }
    // write the file
    RNFS.writeFile(healthRecordPath, PATIENT_HR_SEED, 'utf8')
    .then((success) => {
      console.log('Healthrecord seeded!');
    })
    .catch((err) => {
      console.log(err.message);
    });
  })
}

seedKey = (replaceExisting) => {
  RNFS.exists(keyPath)
  .then(exists => {
    if (!replaceExisting && exists) {
      console.log("Key already exists, not seeding");
      return
    }
    // write the file
    RNFS.writeFile(keyPath, PATIENT_KEY_SEED, 'utf8')
    .then((success) => {
      console.log('Key seeded!');
    })
    .catch((err) => {
      console.log(err.message);
    });
  })
}

module.exports = {
  seedHealthRecord: seedHealthRecord,
  seedKey: seedKey
}
