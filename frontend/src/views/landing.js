import { useIntl, defineMessages } from 'react-intl';

import {
	Button,
} from "@chakra-ui/react";

const messages = defineMessages({
  "test": {
    id: "test"
  }
})
function Landing() {
  const { formatMessage  } = useIntl()
	return (
		<Button colorScheme="teal">
      {formatMessage(messages.test)}
    </Button>
	);
}

export default Landing;
