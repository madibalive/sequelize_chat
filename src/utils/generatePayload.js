let generatePayload = transaction => {
  console.log('object');
  return {
    amount: transaction.amount,
    currency: transaction.currency,
    type: transaction.transaction_type,
    subType: '',
    descriptionText: '',
    requestDate: '',
    requestingOrganisationTransactionReference: '',
    oneTimeCode: '',
    geoCode: '',
    debitParty: [
      {
        key: 'msisdn',
        value: transaction.Destination.msisdn
      },
      {
        key: 'bankaccountno',
        value: ''
      }
    ],
    creditParty: [
      {
        key: 'msisdn',
        value: transaction.Source.msisdn
      }
    ],
    senderKyc: {
      nationality: '',
      dateOfBirth: '',
      occupation: '',
      employerName: '',
      contactPhone: transaction.Source.msisdn,
      gender: '',
      idDocument: [
        {
          idType: '',
          idNumber: '',
          issueDate: '',
          expiryDate: '',
          issuer: '',
          issuerPlace: '',
          issuerCountry: '',
          otherIdDescription: ''
        }
      ],
      postalAddress: {
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        country: ''
      },
      subjectName: {
        title: '',
        firstName: transaction.Source.name,
        middleName: '',
        lastName: '',
        fullName: '',
        nativeName: ''
      },
      emailAddress: '',
      birthCountry: ''
    },
    recipientKyc: {
      nationality: '',
      dateOfBirth: '',
      occupation: '',
      employerName: '',
      contactPhone: transaction.Destination.msisdn,
      gender: '',
      idDocument: [
        {
          idType: '',
          idNumber: '',
          issueDate: '',
          expiryDate: '',
          issuer: '',
          issuerPlace: '',
          issuerCountry: '',
          otherIdDescription: ''
        }
      ],
      postalAddress: {
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        country: ''
      },
      subjectName: {
        title: '',
        firstName: transaction.Destination.name,
        middleName: '',
        lastName: '',
        fullName: '',
        nativeName: ''
      },
      emailAddress: '',
      birthCountry: ''
    },
    originalTransactionReference: '',
    servicingIdentity: '',
    requestingLei: '',
    receivingLei: '',
    metadata: [
      {
        key: '',
        value: ''
      }
    ],
    transactionStatus: transaction.status,
    creationDate: transaction.createdAt,
    modificationDate: transaction.updatedAt,
    transactionReference: '',
    transactionReceipt: '',
    internationalTransferInformation: {
      originCountry: '',
      quotationReference: '',
      quoteId: '',
      receivingCountry: '',
      remittancePurpose: '1',
      relationshipSender: '',
      deliveryMethod: '',
      senderBlockingReason: '',
      recipientBlockingReason: ''
    }
  };
};

export default generatePayload;
